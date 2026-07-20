# Study Agents

This directory contains minimal implementations of the Gemini agent in various
languages. These agents are intended for study and as a baseline for building
your own agent from scratch.

## Prerequisites

- **Go:** [Install Go](https://go.dev/doc/install) (1.21+)
- **Python:** [Install Python](https://www.python.org/downloads/) (3.11+)
- **Node.js:** [Install Node.js](https://nodejs.org/en/download/) (20+)
- **Rust:** [Install Rust](https://rustup.rs/) (1.70+)

## Common Setup

All agents require a `GEMINI_API_KEY` environment variable to be set. You can
get one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

You can set it in your shell or create a `.env` file in the root of the project
(the agents are configured to load `.env` from the project root if present).

```bash
export GEMINI_API_KEY=your_api_key_here
```

---

## TypeScript Agent

The TypeScript agent is a simple REPL using the `@google/genai` SDK and
`readline`.

### Running

From the root of the repository:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Build and run:**
    ```bash
    npm run start -w @wilhelm-tiger/agent-ts
    ```

Or, from within `packages/study/agent-ts`:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Build the project:**
    ```bash
    npm run build
    ```
3.  **Run the agent:**
    ```bash
    npm run start
    ```

---

## Python Agent

The Python agent uses the `google-genai` Python library.

### Running

From `packages/study/agent-py`:

1.  **Create a virtual environment (optional but recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the agent:**
    ```bash
    python main.py
    ```

---

## Go Agent

The Go agent uses the `google.golang.org/genai` SDK.

### Running

From `packages/study/agent-go`:

1.  **Run the agent directly:**
    ```bash
    go run main.go
    ```

---

## Rust Agent

The Rust agent uses `reqwest` and `reqwest-eventsource` to stream responses
directly from the Gemini REST API.

### Running

From `packages/study/agent-rs`:

1.  **Run the agent:**
    ```bash
    cargo run
    ```
