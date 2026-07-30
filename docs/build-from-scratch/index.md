# Build agents from scratch: A multi-language journey

Welcome to the core learning curriculum of this fork. The primary purpose of
this repository is to help us master AI agent development by building the exact
same agent architecture side-by-side in **Python, Go, TypeScript, and Rust**.

## Why a multi-language approach?

By building the identical agent structure in four different languages, you will
learn far more than just syntax. You will discover the unique strengths, design
patterns, and ecosystem quirks of each language when applied to AI.

1.  **Learn universal concepts:** When you write a tool-calling loop in
    TypeScript, then rewrite it in Go, Python, and Rust, you abstract away the
    language. You realize that an agent is fundamentally just a state machine (a
    `while` loop) that parses JSON and executes functions, regardless of the
    language.
2.  **Experience paradigm shifts:**
    - **TypeScript** will teach you how to handle asynchronous data streams and
      JSON manipulation effortlessly.
    - **Go** will force you to think strictly about types, concurrency
      (goroutines), and error handling (without relying on simple `try/catch`
      blocks).
    - **Python** will show you why data scientists love it—everything feels like
      magic, but you will also see how dynamic typing can lead to runtime
      surprises if you aren't careful.
    - **Rust** will show you how to build a blazingly fast, memory-safe agent
      with strict compiler guarantees and excellent asynchronous REST streaming.
3.  **Build a reusable portfolio:** At the end of this journey, you will have
    four production-ready agent boilerplates that you can pull off the shelf
    depending on your future job requirements or project needs.

## The roadmap

We progress through specific milestones across all four languages
simultaneously. You can find the source code for these in the
`packages/study/agent-ts-minimal`, `packages/study/agent-py-minimal`,
`packages/study/agent-go-minimal`, and `packages/study/agent-rs-minimal`
directories.

- **[Milestone 1: The Chat Loop](./milestone-1-chat-loop.md)**
  - Initialize the project structures (`npm`, `poetry` or `pip`, `go mod`) for
    our `minimal` baseline agents.
  - Set up environment variables and the Gemini SDKs.
  - Build a simple terminal loop that streams responses.
- **[Milestone 2: Memory and Context](./milestone-2-memory.md)**
  - Transition to an industrial **Blocks** architecture.
  - Implement a `Memory` component to keep track of the conversation history.
  - Assemble the agent by plugging the component into the core `AgentEngine`.
- **[Milestone 3: System Prompts and Persona](./milestone-3-system-prompts.md)**
  - Build a `Persona` component to inject system instructions and steer the
    model's behavior.
- **[Milestone 4: Tool Calling](./milestone-4-tool-calling.md)**
  - Build a `Tools` component that exposes local functions to the LLM.
  - Handle the execution loop: Model requests tool -> Engine runs tool -> Engine
    returns result to Model.
- **[Milestone 5: The "ReAct" Loop](./milestone-5-react-loop.md)**
  - Upgrade the Engine to allow the agent to reason, execute a tool, observe the
    result, and decide if it needs to execute another tool before answering the
    user.
