from typing import List
from .types import ChatMessage, AgentComponent

class ChatMemoryBuffer:
    def __init__(self, initial_history: List[ChatMessage] = None):
        self.history: List[ChatMessage] = initial_history or []

    async def before_llm_call(self, messages: List[ChatMessage]) -> List[ChatMessage]:
        return self.history + messages

    async def after_llm_call(self, user_message: str, assistant_response: str) -> None:
        self.history.append(ChatMessage(role="user", content=user_message))
        self.history.append(ChatMessage(role="model", content=assistant_response))

    def reset(self) -> None:
        self.history = []
