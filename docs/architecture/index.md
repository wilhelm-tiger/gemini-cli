# Architecture overview

Gemini CLI is designed as a modular, monorepo-based application. This guide
explains the end-to-end flow of how a user's prompt is processed and a response
is generated, highlighting the relationship between the CLI and Core packages.

## Process entry and bootstrapping

The entry point for the application handles process lifecycle and environment
checks before launching the main application logic.

Execution begins in the `packages/cli/index.ts` file. This file acts as the
binary entry point. Its primary job is to bootstrap the Node.js environment,
manage memory settings, handle process relaunching, and eventually invoke the
main application logic.

## Orchestration and mode selection

Once the process is bootstrapped, the CLI sets up its global state and decides
how to interact with the user based on their configuration and arguments.

The primary orchestrator is located in `packages/cli/src/gemini.tsx`. The
`main()` function in this file is responsible for loading configurations (via
`loadCliConfig()`), checking authentication, setting up terminal themes, and
branching into one of two execution modes: interactive or non-interactive.

## Execution flows

Depending on how you invoke Gemini CLI, the prompt follows one of two paths in
the CLI layer.

### Interactive flow

When running in a standard terminal without piped input, the CLI launches a chat
interface.

The file `packages/cli/src/interactiveCli.tsx` sets up the React and Ink
terminal interface. The core React component that orchestrates state, handles
user input submissions, and renders the chat stream is
`packages/cli/src/ui/AppContainer.tsx`.

### Non-interactive flow

When input is piped or when running in a single-shot headless mode, the UI is
bypassed.

The `packages/cli/src/nonInteractiveCli.ts` file contains the loop for passing
the user's prompt directly to the backend client, streaming the response
straight to `stdout`, and orchestrating tool-calling loops without a UI.

## Core logic and API communication

Regardless of the UI mode, the actual brain that sends the prompt to the large
language model (LLM) and manages the multi-turn agent loop is located in the
`@wilhelm-tiger/gemini-cli-core` package.

The core engine for generating a response is the `GeminiClient`, located in
`packages/core/src/core/client.ts`. It exposes methods like `sendMessageStream`
which:

- Collects the prompt, session history, and IDE context.
- Checks for loops and manages prompt token limits.
- Dispatches the request to the Gemini API or configured model router.

Additionally, `packages/core/src/agent/scheduler.ts` manages the agentic loop.
When the model requests a tool call, the scheduler intercepts the request,
executes the required tools, and then sends the tool outputs back to the
`GeminiClient` to continue generating the response.

## Connection summary

The components connect in a clear sequence to take a prompt from the terminal to
the LLM and back.

1.  **CLI entry (`index.ts`):** Starts the process.
2.  **CLI orchestrator (`gemini.tsx`):** Prepares the environment and loads
    configurations.
3.  **Config service (`config.ts`):** Acts as the bridge, instantiating the
    backend client.
4.  **Core backend client (`client.ts`):** Acts as the engine that communicates
    with the Gemini API, manages chat history, and runs the agent loop.
