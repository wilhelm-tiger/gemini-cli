/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import type { ChatMessage, AgentComponent } from './types.js';

/**
 * The core industrial agent loop.
 * Orchestrates components and manages the LLM lifecycle.
 */
export class AgentEngine {
  private components: AgentComponent[] = [];
  private ai: GoogleGenAI;
  private modelName: string;

  constructor(apiKey: string, modelName = 'gemini-3-flash-preview') {
    this.ai = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  /**
   * Registers a pluggable component.
   */
  use(component: AgentComponent): this {
    this.components.push(component);
    return this;
  }

  /**
   * Executes a single chat turn.
   */
  async *chat(userInput: string): AsyncGenerator<string> {
    let messages: ChatMessage[] = [{ role: 'user', content: userInput }];

    // 1. Run 'beforeLLMCall' hooks (e.g., Memory injection)
    for (const component of this.components) {
      if (component.beforeLLMCall) {
        messages = await component.beforeLLMCall(messages);
      }
    }

    // 2. Prepare for Gemini API
    // Note: Gemini uses 'user' and 'model' as roles
    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    // 3. Call LLM
    const result = await this.ai.models.generateContentStream({
      model: this.modelName,
      contents,
    });

    // 4. Stream response and capture full text
    let fullResponse = '';
    for await (const chunk of result) {
      const text = chunk.text || '';
      fullResponse += text;
      yield text;
    }

    // 5. Run 'afterLLMCall' hooks (e.g., Save to memory)
    for (const component of this.components) {
      if (component.afterLLMCall) {
        await component.afterLLMCall(userInput, fullResponse);
      }
    }
  }
}
