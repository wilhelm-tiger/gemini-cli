/* eslint-disable no-console */
import { GoogleGenAI } from '@google/genai';
import * as readline from 'node:readline';
import * as dotenv from 'dotenv';
import { EnvHttpProxyAgent, setGlobalDispatcher } from 'undici';

// Load environment variables from .env file if present
dotenv.config();

// Remove conflicting environment variables if they exist
delete process.env.GOOGLE_API_KEY;

// Setup HTTP proxy if configured in the environment
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.https_proxy || process.env.http_proxy;
if (proxyUrl) {
  setGlobalDispatcher(new EnvHttpProxyAgent({
    httpProxy: proxyUrl,
    httpsProxy: proxyUrl,
    noProxy: process.env.NO_PROXY || process.env.no_proxy || ''
  }));
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: '
});

console.log("=========================================");
console.log("Agent-TS: The Chat Loop (Milestone 1)");
console.log("Type your message, or 'exit' to close.");
console.log("=========================================");
rl.prompt();

let isGenerating = false;

rl.on('line', async (line) => {
  const input = line.trim();
  
  if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
    console.log("Goodbye!");
    rl.close();
    return;
  }

  if (!input) {
    rl.prompt();
    return;
  }

  isGenerating = true;
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: input,
    });

    process.stdout.write('Gemini: ');
    for await (const chunk of responseStream) {
      process.stdout.write(chunk.text || '');
    }
    console.log(); 
  } catch (error) {
    console.error("\nError:", error instanceof Error ? error.message : error);
  } finally {
    isGenerating = false;
  }

  rl.prompt();
}).on('close', () => {
  if (!isGenerating) {
    process.exit(0);
  }
});
