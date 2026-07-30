/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export type MessageRole = 'user' | 'model' | 'system';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

/**
 * Base interface for all pluggable agent components.
 * Follows the middleware pattern for modifying agent behavior.
 */
export interface AgentComponent {
  /**
   * Hook called before the LLM is invoked.
   * Allows components to inject context, history, or modify the prompt.
   */
  beforeLLMCall?: (messages: ChatMessage[]) => Promise<ChatMessage[]>;

  /**
   * Hook called after the LLM has successfully responded.
   * Allows components to store state or process results.
   */
  afterLLMCall?: (
    userMessage: string,
    assistantResponse: string,
  ) => Promise<void>;
}
