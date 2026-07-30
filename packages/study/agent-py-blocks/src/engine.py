from typing import List, AsyncGenerator
from google import genai
from .types import ChatMessage, AgentComponent

class AgentEngine:
    def __init__(self, api_key: str, model_name: str = "gemini-3-flash-preview"):
        self.client = genai.Client(api_key=api_key)
        self.model_name = model_name
        self.components: List[AgentComponent] = []

    def use(self, component: AgentComponent) -> "AgentEngine":
        self.components.append(component)
        return self

    async def chat(self, user_input: str) -> AsyncGenerator[str, None]:
        messages = [ChatMessage(role="user", content=user_input)]

        # 1. Run before_llm_call hooks
        for component in self.components:
            if hasattr(component, "before_llm_call"):
                messages = await component.before_llm_call(messages)

        # 2. Prepare contents for API
        contents = [{"role": m.role, "parts": [{"text": m.content}]} for m in messages]

        # 3. Call LLM
        response_stream = self.client.models.generate_content_stream(
            model=self.model_name,
            contents=contents
        )

        # 4. Stream and capture
        full_response = ""
        async for chunk in response_stream:
            text = chunk.text or ""
            full_response += text
            yield text

        # 5. Run after_llm_call hooks
        for component in self.components:
            if hasattr(component, "after_llm_call"):
                await component.after_llm_call(user_input, full_response)
