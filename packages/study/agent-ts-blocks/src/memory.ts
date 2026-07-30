/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ChatMessage, AgentComponent } from './types.js';

/**
 * A simple chat history manager.
 * Inspired by LlamaIndex's ChatMemoryBuffer.
 */
export class ChatMemoryBuffer implements AgentComponent {
  private history: ChatMessage[] = [];

  constructor(initialHistory: ChatMessage[] = []) {
    this.history = initialHistory;
  }

  /**
   * Injects history into the current turn.
   */
  async beforeLLMCall(messages: ChatMessage[]): Promise<ChatMessage[]> {
    // Note: 'messages' usually contains only the current user message.
    // We prepend the stored history to provide context.
    return [...this.history, ...messages];
  }

  /**
   * Persists the turn after a successful response.
   */
  async afterLLMCall(
    userMessage: string,
    assistantResponse: string,
  ): Promise<void> {
    this.history.push({ role: 'user', content: userMessage });
    this.history.push({ role: 'model', content: assistantResponse });
  }

  /**
   * Clear the memory.
   */
  reset(): void {
    this.history = [];
  }
}
