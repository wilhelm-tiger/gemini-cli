package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"google.golang.org/genai"
)

func main() {
	// Load .env file if it exists
	_ = godotenv.Load()

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("Error: GEMINI_API_KEY environment variable is not set.")
	}

	ctx := context.Background()

	// Initialize the client. The SDK automatically picks up the GEMINI_API_KEY from the environment
	// if we don't explicitly pass it, but we can also pass it explicitly via config if we want.
	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		log.Fatalf("Error creating client: %v", err)
	}

	fmt.Println("=========================================")
	fmt.Println("Agent-GO: The Chat Loop (Milestone 1)")
	fmt.Println("Type your message, or 'exit' to close.")
	fmt.Println("=========================================")

	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("You: ")
		text, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("\nGoodbye!")
			break
		}

		text = strings.TrimSpace(text)
		if text == "" {
			continue
		}

		if strings.ToLower(text) == "exit" || strings.ToLower(text) == "quit" {
			fmt.Println("Goodbye!")
			break
		}

		// Prepare the streaming request
		content := genai.Text(text)
		
		iter := client.Models.GenerateContentStream(ctx, "gemini-3-flash-preview", content, nil)

		fmt.Print("Gemini: ")
		for resp, err := range iter {
			if err != nil {
				fmt.Printf("\nError: %v\n", err)
				break
			}
			
			if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
				for _, part := range resp.Candidates[0].Content.Parts {
					if part.Text != "" {
						fmt.Print(part.Text)
					}
				}
			}
		}
		fmt.Println() // Newline after the full response
	}
}
