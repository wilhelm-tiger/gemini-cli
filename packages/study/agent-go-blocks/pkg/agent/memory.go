package agent

import "context"

type ChatMemoryBuffer struct {
	history []ChatMessage
}

func NewChatMemoryBuffer(initialHistory []ChatMessage) *ChatMemoryBuffer {
	return &ChatMemoryBuffer{history: initialHistory}
}

func (m *ChatMemoryBuffer) BeforeLLMCall(ctx context.Context, messages []ChatMessage) ([]ChatMessage, error) {
	return append(m.history, messages...), nil
}

func (m *ChatMemoryBuffer) AfterLLMCall(ctx context.Context, userMessage, assistantResponse string) error {
	m.history = append(m.history, ChatMessage{Role: RoleUser, Content: userMessage})
	m.history = append(m.history, ChatMessage{Role: RoleModel, Content: assistantResponse})
	return nil
}

func (m *ChatMemoryBuffer) Reset() {
	m.history = nil
}
