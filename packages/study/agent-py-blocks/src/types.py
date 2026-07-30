from typing import List, Protocol, Optional, AsyncGenerator
from dataclasses import dataclass

@dataclass
class ChatMessage:
    role: str # 'user', 'model', or 'system'
    content: str

class AgentComponent(Protocol):
    async def before_llm_call(self, messages: List[ChatMessage]) -> List[ChatMessage]:
        ...

    async def after_llm_call(self, user_message: str, assistant_response: str) -> None:
        ...
