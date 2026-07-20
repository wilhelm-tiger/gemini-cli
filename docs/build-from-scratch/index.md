## Why Google Builds With JavaScript

- **Rich Terminal UIs (React Ink)**: If we look at the `gemini-cli` source code
  (specifically `interactiveCli.tsx`), we'll see they are using a library called
  [Ink](https://github.com/vadimdemedes/ink). Ink allows developers to build
  complex, responsive terminal user interfaces using React. Building things like
  live markdown rendering, multi-step confirmation dialogs, and interactive file
  pickers is significantly easier using React's component model than manually
  managing cursor positions in Go or Python.
- **The Web & MCP Ecosystem**: The CLI heavily utilizes the Model Context
  Protocol (MCP) to give the agent access to external tools and APIs. Much of
  the tooling, SDKs, and community momentum around MCP (and web-fetching tools
  in general) is deeply rooted in the JavaScript ecosystem.

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
`packages/study/agent-ts`, `packages/study/agent-py`, `packages/study/agent-go`,
and `packages/study/agent-rs` directories.

- **Milestone 1: The Chat Loop**
  - Initialize the project structures (`npm`, `poetry` or `pip`, `go mod`).
  - Set up environment variables and the Gemini SDKs.
  - Build a simple terminal loop that streams responses.
- **Milestone 2: Memory and Context**
  - Implement an array or list to keep track of the conversation history.
  - Learn how to truncate or summarize history when the context gets too large.
- **Milestone 3: System Prompts and Persona**
  - Give the agent a system instruction to dictate its behavior.
- **Milestone 4: Tool Calling**
  - Define a simple local function (for example, "get the current time" or "read
    a file").
  - Provide the JSON schema of that function to the LLM.
  - Write the execution loop: Model requests tool -> Code runs tool -> Code
    returns result to Model.
- **Milestone 5: The "ReAct" Loop**
  - Allow the agent to reason, execute a tool, observe the result, and decide if
    it needs to execute another tool before answering the user.
