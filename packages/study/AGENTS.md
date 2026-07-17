# Study Agents - Architectural Guidelines

This directory contains educational agent implementations designed to mirror
industrial standards, specifically following the architecture and design
patterns of **LlamaIndex**.

## Architectural Philosophy: Composition over Inheritance

Our agents are built using a **Modular Engine + Pluggable Components**
architecture. This ensures that the core execution logic remains clean and
minimal while allowing for sophisticated features (like Memory, Tool Calling,
and GraphRAG) to be "snapped in" as independent modules.

### The Core Engine (`AgentEngine`)

The engine is the heart of the agent. It manages the fundamental Read-Eval-Print
Loop (REPL) and orchestrates the flow of data. It provides lifecycle hooks that
components can tap into:

- `before_llm_call`: Modify the prompt or inject context (e.g., Memory, RAG).
- `after_llm_call`: Process the response (e.g., Save to memory, Parse tools).
- `on_error`: Handle failures gracefully.

### Pluggable Components

Features like `Memory`, `SystemPrompts`, and `Retrievers` (including future
experimental GraphRAG) must be implemented as standalone components that adhere
to the Engine's plugin interface.

## Mandatory Synchronization Policy

To preserve the step-by-step educational journey while maintaining technical
integrity, all agents must follow these rules:

1. **LlamaIndex as the North Star**: When faced with an architectural decision,
   refer to how LlamaIndex handles it (e.g., `QueryPipeline`, `CallbackManager`,
   `BaseChatEngine`).
2. **Minimal and Blocks Structure**: We only ship the `minimal` baseline agents
   and the `blocks` packages. All new milestone features (memory, persona,
   tools) should be implemented purely as new components inside the `blocks`
   packages.
3. **No Code Bloat**: Do not add complex features directly into the
   `AgentEngine`. If it's a feature, it belongs in a Component.
4. **Language Consistency**: Ensure that the naming conventions and hook
   structures are as consistent as possible across TypeScript, Python, Go, and
   Rust, while respecting each language's idiomatic style.

## Milestone Roadmap

- **M1: Core Engine:** Bare-bones loop with streaming LLM support.
- **M2: Memory Component:** Pluggable conversation history.
- **M3: Persona Component:** System instructions and model steering.
- **M4: Tool/Service Component:** Function calling and tool execution.
- **M5: ReAct/Orchestration:** Multi-step reasoning loops.
- **Experimental: GraphRAG:** Persistent, graph-based context retrieval.
