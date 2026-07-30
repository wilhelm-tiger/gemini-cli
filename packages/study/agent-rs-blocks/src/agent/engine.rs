use crate::agent::types::{AgentComponent, ChatMessage, MessageRole};
use futures_util::StreamExt;
use reqwest_eventsource::{Event, EventSource};
use serde_json::json;

pub struct AgentEngine {
    api_key: String,
    model_name: String,
    components: Vec<Box<dyn AgentComponent>>,
}

impl AgentEngine {
    pub fn new(api_key: String, model_name: Option<String>) -> Self {
        Self {
            api_key,
            model_name: model_name.unwrap_or_else(|| "gemini-3-flash-preview".to_string()),
            components: Vec::new(),
        }
    }

    pub fn use_component(&mut self, component: Box<dyn AgentComponent>) {
        self.components.push(component);
    }

    pub async fn chat(&mut self, user_input: &str) -> Result<impl futures_util::Stream<Item = String>, Box<dyn std::error::Error>> {
        let mut messages = vec![ChatMessage {
            role: MessageRole::User,
            content: user_input.to_string(),
        }];

        // 1. Run before_llm_call hooks
        for comp in &self.components {
            messages = comp.before_llm_call(messages).await;
        }

        // 2. Prepare contents for API
        let contents = json!(messages.iter().map(|m| {
            json!({
                "role": m.role,
                "parts": [{"text": m.content}]
            })
        }).collect::<Vec<_>>());

        let url = format!(
            "https://generativelanguage.googleapis.com/v1beta/models/{}:streamGenerateContent?alt=sse&key={}",
            self.model_name, self.api_key
        );

        // 3. Call LLM
        let client = reqwest::Client::new();
        let request = client.post(url).json(&json!({ "contents": contents }));
        let mut event_source = EventSource::new(request)?;

        let (tx, rx) = tokio::sync::mpsc::unbounded_channel();
        let user_input_owned = user_input.to_string();
        
        // This is a bit tricky in Rust because of ownership and components needing to be updated.
        // For simplicity in this study agent, we'll collect the full response then run hooks.
        
        let mut full_response = String::new();
        
        tokio::spawn(async move {
            while let Some(event) = event_source.next().await {
                match event {
                    Ok(Event::Message(message)) => {
                        let v: serde_json::Value = serde_json::from_str(&message.data).unwrap_or_default();
                        if let Some(text) = v["candidates"][0]["content"]["parts"][0]["text"].as_str() {
                            full_response.push_str(text);
                            let _ = tx.send(text.to_string());
                        }
                    }
                    _ => break,
                }
            }
            // After streaming is done, we need to notify components.
            // In a real industrial agent, we'd use an event bus or similar.
        });

        Ok(tokio_stream::wrappers::UnboundedReceiverStream::new(rx))
    }
}
