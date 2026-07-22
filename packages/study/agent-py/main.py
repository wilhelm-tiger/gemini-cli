import os
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import errors

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    # Check for API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    # Note: Python's requests library (used by google-genai) automatically respects
    # HTTP_PROXY and HTTPS_PROXY environment variables.
    
    # Initialize the client
    client = genai.Client(api_key=api_key)
    
    print("=========================================")
    print("Agent-PY: The Chat Loop (Milestone 1)")
    print("Type your message, or 'exit' to close.")
    print("=========================================")
    
    # Read-Eval-Print Loop
    while True:
        try:
            # Get user input
            user_input = input("You: ").strip()
            
            if not user_input:
                continue
                
            if user_input.lower() in ['exit', 'quit']:
                print("Goodbye!")
                break
                
            # Call the Gemini API using streaming
            response_stream = client.models.generate_content_stream(
                model='gemini-3-flash-preview',
                contents=user_input
            )
            
            print("Gemini: ", end="", flush=True)
            for chunk in response_stream:
                print(chunk.text, end="", flush=True)
            print() # Newline after the full response
            
        except EOFError:
            # Handle Ctrl+D gracefully
            print("\nGoodbye!")
            break
        except KeyboardInterrupt:
            # Handle Ctrl+C gracefully
            print("\nGoodbye!")
            break
        except errors.APIError as e:
            print(f"\nAPI Error: {e}", file=sys.stderr)
        except Exception as e:
            print(f"\nError: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
