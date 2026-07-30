package agent

import (
	"context"
	"fmt"

	"google.golang.org/genai"
)

type AgentEngine struct {
	client     *genai.Client
	modelName  string
	components []AgentComponent
}

func NewAgentEngine(ctx context.Context, apiKey string, modelName string) (*AgentEngine, error) {
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  apiKey,
		Backend: genai.BackendGemini,
	})
	if err != nil {
		return nil, err
	}

	if modelName == "" {
		modelName = "gemini-3-flash-preview"
	}

	return &AgentEngine{
		client:    client,
		modelName: modelName,
	}, nil
}

func (e *AgentEngine) Use(component AgentComponent) {
	e.components = append(e.components, component)
}

func (e *AgentEngine) Chat(ctx context.Context, userInput string, callback func(string)) error {
	messages := []ChatMessage{{Role: RoleUser, Content: userInput}}

	// 1. Run BeforeLLMCall hooks
	var err error
	for _, comp := range e.components {
		messages, err = comp.BeforeLLMCall(ctx, messages)
		if err != nil {
			return err
		}
	}

	// 2. Prepare contents for API
	var contents []*genai.Content
	for _, m := range messages {
		contents = append(contents, &genai.Content{
			Role:  string(m.Role),
			Parts: []*genai.Part{{Text: m.Content}},
		})
	}

	// 3. Call LLM
	iter := e.client.Models.GenerateContentStream(ctx, e.modelName, contents, nil)

	// 4. Stream and capture
	fullResponse := ""
	for {
		resp, err := iter.Next()
		if err != nil {
			break
		}
		for _, candidate := range resp.Candidates {
			for _, part := range candidate.Content.Parts {
				text := part.Text
				fullResponse += text
				callback(text)
			}
		}
	}

	// 5. Run AfterLLMCall hooks
	for _, comp := range e.components {
		err = comp.AfterLLMCall(ctx, userInput, fullResponse)
		if err != nil {
			return err
		}
	}

	return nil
}
