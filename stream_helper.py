import sys
import json

def process_stream():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            data = json.loads(line)
            
            # Handle Amp/Claude Code stream format
            # Type: content_block_delta -> delta -> text
            if data.get("type") == "content_block_delta":
                delta = data.get("delta", {})
                if delta.get("type") == "text_delta":
                    text = delta.get("text", "")
                    if text:
                        print(text, end="", flush=True)
            
            # Handle text via other events if needed (e.g. usage, input)
            # But primarily we want the assistant response text.
            
            # If it's a message_start/stop or other events, ignore for text output.
            
        except json.JSONDecodeError:
            # If it's not JSON, just print the line (fallback)
            print(line, flush=True)
        except Exception as e:
            # Ignore other errors to keep stream alive
            pass

if __name__ == "__main__":
    process_stream()
