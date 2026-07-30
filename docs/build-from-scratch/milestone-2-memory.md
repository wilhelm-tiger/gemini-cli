# Milestone 2: Memory and context

In this milestone, you will upgrade your agent from a simple one-shot chat loop
to an industrial-grade agent with persistent conversation memory. Instead of
modifying your minimal script, you will adopt a **modular architecture**
inspired by **LlamaIndex**.

You will move away from raw scripts and begin using reusable **Building Blocks**
to compose your agent.

## The problem: Goldfish memory

In Milestone 1, your agent was "stateless." Every time you sent a message, the
LLM saw it as a completely new conversation. If you said "My name is Jack," and
then asked "What is my name?", the agent would not know the answer.

To fix this, we must send the entire conversation history (the "context") back
to the LLM with every new request.

## The industrial approach: Composition

Rather than stuffing memory logic directly into the main loop, we use an **Agent
Engine** that supports **pluggable components**. This is how professional
frameworks like LlamaIndex are built.

### Step 1: Explore the building blocks

We have provided industrial building blocks for each language in the
`packages/study/agent-*-blocks` directories:

- **TypeScript**: `packages/study/agent-ts-blocks`
- **Python**: `packages/study/agent-py-blocks`
- **Go**: `packages/study/agent-go-blocks`
- **Rust**: `packages/study/agent-rs-blocks`

These blocks typically include:

- **`AgentEngine`**: Manages the lifecycle of a chat turn and orchestrates
  components.
- **`ChatMemoryBuffer`**: A component that tracks conversation history and
  automatically injects it into the LLM call.
- **`AgentComponent`** (or Interface): Defines hooks like `beforeLLMCall` and
  `afterLLMCall`.

### Step 2: Assemble your industrial agent

To upgrade your agent, you will create a new file (e.g., `src/industrial.ts` or
`main_industrial.py`) and assemble the blocks.

Follow these steps to build your memory-enabled agent:

1.  **Initialize the Engine**: Create an instance of `AgentEngine` with your API
    key.
2.  **Add Memory**: Instantiate a `ChatMemoryBuffer` and "plug" it into the
    engine.
3.  **Run the Loop**: Use the engine's `chat` method inside your terminal loop.

#### Example (TypeScript)

```typescript
import { AgentEngine, ChatMemoryBuffer } from '@wilhelm-tiger/agent-ts-blocks';

const engine = new AgentEngine(process.env.GEMINI_API_KEY!);
engine.use(new ChatMemoryBuffer());

while (true) {
  const userInput = await ask('You: ');
  const stream = engine.chat(userInput);

  process.stdout.write('Gemini: ');
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
  console.log();
}
```

#### Example (Python)

```python
from agent_py_blocks import AgentEngine, ChatMemoryBuffer

engine = AgentEngine(api_key=os.getenv("GEMINI_API_KEY"))
engine.use(ChatMemoryBuffer())

async def main():
    while True:
        user_input = input("You: ")
        async for chunk in engine.chat(user_input):
            print(chunk, end="", flush=True)
        print()
```

## How it works: The Middleware pattern

When you call `engine.chat(userInput)`, the following happens automatically
under the hood:

1.  **`beforeLLMCall`**: The `ChatMemoryBuffer` intercepts the request and
    prepends all previous messages from its internal history to your current
    message.
2.  **LLM Invocation**: The engine sends the full context to Gemini.
3.  **`afterLLMCall`**: Once Gemini finishes responding, the `ChatMemoryBuffer`
    receives the final answer and saves both your question and the answer into
    its history for the next turn.

## Next steps

Now that your agent has memory, you can try asking it questions that refer back
to previous parts of the conversation. In the next milestone, we will add a
**Persona** to our agent using a pluggable **System Prompt** component.
