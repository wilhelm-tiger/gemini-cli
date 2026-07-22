# Milestone 1: The chat loop

This is the foundation of our multi-language agent learning path. In this
milestone, you set up the basic project structure and implement a simple
Read-Eval-Print Loop (REPL) that takes user input, passes it to the Gemini API,
and streams the response back.

We implement this in four languages:

- **TypeScript:** In `packages/study/agent-ts`
- **Python:** In `packages/study/agent-py`
- **Go:** In `packages/study/agent-go`
- **Rust:** In `packages/study/agent-rs`

## Prerequisites

Before starting, you must install the development tools for the languages you
plan to use.

- **Go:** [Install Go](https://go.dev/doc/install) (1.21+)
- **Python:** [Install Python](https://www.python.org/downloads/) (3.11+)
- **Node.js:** [Install Node.js](https://nodejs.org/en/download/) (20+)
- **Rust:** [Install Rust](https://rustup.rs/) (1.70+)

## Common setup

All agents require a `GEMINI_API_KEY` environment variable. You can get a key
from [Google AI Studio](https://aistudio.google.com/app/apikey).

Set the variable in your shell or create a `.env` file in the project root. The
agents automatically load `.env` from the project root if it is present.

```bash
export GEMINI_API_KEY=your_api_key_here
```

## TypeScript agent

The TypeScript agent is a simple REPL that uses the `@google/genai` SDK and
`readline`.

### Running the agent

You can run the TypeScript agent from the repository root or from the package
directory.

To run from the repository root:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Build and run:
    ```bash
    npm run start -w @wilhelm-tiger/agent-ts
    ```

To run from `packages/study/agent-ts`:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Build the project:
    ```bash
    npm run build
    ```
3.  Run the agent:
    ```bash
    npm run start
    ```

## Python agent

The Python agent uses the `google-genai` Python library to communicate with the
Gemini API.

### Running the agent

Follow these steps to set up and run the Python agent from
`packages/study/agent-py`.

1.  Optional: Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the agent:
    ```bash
    python main.py
    ```

## Go agent

The Go agent uses the `google.golang.org/genai` SDK for its implementation.

### Running the agent

Run the Go agent directly from `packages/study/agent-go` using the following
command:

```bash
go run main.go
```

## Rust agent

The Rust agent uses `reqwest` and `reqwest-eventsource` to stream responses
directly from the Gemini REST API.

### Running the agent

Run the Rust agent from `packages/study/agent-rs` using Cargo:

```bash
cargo run
```
