#!/usr/bin/env python3
"""
Script to take screenshots of the Assistant UI Widget using Puppeteer.
This allows Claude to view the widget's appearance.
"""

import subprocess
import sys
import time
from pathlib import Path


def start_demo_server():
    """Start the demo server in the background."""
    print("Starting demo server...")
    process = subprocess.Popen(
        ["npm", "run", "demo"],
        cwd=Path(__file__).parent / "frontend",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    
    # Wait for server to start
    time.sleep(8)
    return process


def take_screenshot(add_demo_messages=True, interactive=False):
    """Take a screenshot of the widget using Puppeteer."""
    env = {
        "DEMO_URL": "http://localhost:3000",
        "ADD_DEMO_MESSAGES": "true" if add_demo_messages else "false",
        "INTERACTIVE_SCREENSHOT": "true" if interactive else "false",
    }
    
    print("Taking screenshot...")
    result = subprocess.run(
        ["npm", "run", "screenshot"],
        cwd=Path(__file__).parent / "frontend",
        env={**subprocess.os.environ, **env},
        capture_output=True,
        text=True,
    )
    
    if result.returncode != 0:
        print(f"Error taking screenshot: {result.stderr}")
        return False
    
    print(result.stdout)
    return True


def main():
    """Main function to coordinate the screenshot process."""
    server_process = None
    
    try:
        # Start the demo server
        server_process = start_demo_server()
        
        # Take screenshots
        success = take_screenshot(add_demo_messages=True, interactive=True)
        
        if success:
            print("\nScreenshots saved to frontend/screenshots/")
            print("You can now share these with Claude to view the widget!")
        else:
            print("\nFailed to take screenshots.")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\nInterrupted by user.")
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)
    finally:
        # Clean up: stop the server
        if server_process:
            print("\nStopping demo server...")
            server_process.terminate()
            server_process.wait()


if __name__ == "__main__":
    main()