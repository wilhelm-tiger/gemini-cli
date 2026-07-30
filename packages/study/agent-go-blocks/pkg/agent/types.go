package agent

import "context"

type MessageRole string

const (
	RoleUser      MessageRole = "user"
	RoleModel     MessageRole = "model"
	RoleSystem    MessageRole = "system"
)

type ChatMessage struct {
	Role    MessageRole
	Content string
}

type AgentComponent interface {
	BeforeLLMCall(ctx context.Context, messages []ChatMessage) ([]ChatMessage, error)
	AfterLLMCall(ctx context.Context, userMessage, assistantResponse string) error
}
