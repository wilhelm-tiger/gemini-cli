use crate::agent::types::{AgentComponent, ChatMessage, MessageRole};
use async_trait::async_trait;

pub struct ChatMemoryBuffer {
    history: Vec<ChatMessage>,
}

impl ChatMemoryBuffer {
    pub fn new(initial_history: Vec<ChatMessage>) -> Self {
        Self { history: initial_history }
    }

    pub fn reset(&mut self) {
        self.history.clear();
    }
}

#[async_trait]
impl AgentComponent for ChatMemoryBuffer {
    async fn before_llm_call(&self, messages: Vec<ChatMessage>) -> Vec<ChatMessage> {
        let mut new_messages = self.history.clone();
        new_messages.extend(messages);
        new_messages
    }

    async fn after_llm_call(&mut self, user_message: &str, assistant_response: &str) {
        self.history.push(ChatMessage {
            role: MessageRole::User,
            content: user_message.to_string(),
        });
        self.history.push(ChatMessage {
            role: MessageRole::Model,
            content: assistant_response.to_string(),
        });
    }
}
