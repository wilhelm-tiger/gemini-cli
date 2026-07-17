use serde::{Deserialize, Serialize};
use async_trait::async_trait;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum MessageRole {
    User,
    Model,
    System,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: MessageRole,
    pub content: String,
}

#[async_trait]
pub trait AgentComponent: Send + Sync {
    async fn before_llm_call(&self, messages: Vec<ChatMessage>) -> Vec<ChatMessage>;
    async fn after_llm_call(&mut self, user_message: &str, assistant_response: &str);
}
