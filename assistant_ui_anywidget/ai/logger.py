"""Conversation logger for AI interactions."""

import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional


class ConversationLogger:
    """Logs AI conversations to timestamped files."""

    def __init__(self, log_dir: Optional[str] = None):
        """Initialize the logger.

        Args:
            log_dir: Directory to store logs. Defaults to 'ai_conversation_logs'
        """
        self.log_dir = Path(log_dir or "ai_conversation_logs")
        self.log_dir.mkdir(exist_ok=True)
        self.current_log_file: Optional[Path] = None
        self.session_start: Optional[datetime] = None

    def start_session(self) -> Path:
        """Start a new logging session with timestamp."""
        self.session_start = datetime.now()
        timestamp = self.session_start.strftime("%Y%m%d_%H%M%S")
        self.current_log_file = self.log_dir / f"conversation_{timestamp}.json"

        # Initialize log file with metadata
        initial_data = {
            "session_start": self.session_start.isoformat(),
            "session_id": timestamp,
            "conversations": [],
        }

        with open(self.current_log_file, "w") as f:
            json.dump(initial_data, f, indent=2)

        return self.current_log_file

    def log_conversation(
        self,
        thread_id: str,
        user_message: str,
        ai_response: str,
        tool_calls: Optional[List[Dict[str, Any]]] = None,
        context: Optional[Dict[str, Any]] = None,
        error: Optional[str] = None,
    ) -> None:
        """Log a single conversation exchange.

        Args:
            thread_id: The thread/conversation ID
            user_message: The user's input
            ai_response: The AI's response
            tool_calls: Any tool calls made during the conversation
            context: Additional context (kernel state, etc.)
            error: Any error that occurred
        """
        if not self.current_log_file:
            self.start_session()

        # Load existing data
        assert (
            self.current_log_file is not None
        )  # mypy hint: guaranteed by start_session()
        with open(self.current_log_file, "r") as f:
            data = json.load(f)

        # Create conversation entry
        conversation = {
            "timestamp": datetime.now().isoformat(),
            "thread_id": thread_id,
            "user_message": user_message,
            "ai_response": ai_response,
            "tool_calls": tool_calls or [],
            "context": context or {},
            "error": error,
        }

        # Append to conversations
        data["conversations"].append(conversation)

        # Update session end time
        data["session_end"] = datetime.now().isoformat()

        # Write back to file
        with open(self.current_log_file, "w") as f:
            json.dump(data, f, indent=2)

    def get_current_log_path(self) -> Optional[Path]:
        """Get the current log file path."""
        return self.current_log_file

    def get_session_summary(self) -> Dict[str, Any]:
        """Get a summary of the current session."""
        if not self.current_log_file or not self.current_log_file.exists():
            return {"status": "No active session"}

        with open(self.current_log_file, "r") as f:
            data = json.load(f)

        return {
            "session_id": data.get("session_id"),
            "session_start": data.get("session_start"),
            "session_end": data.get("session_end"),
            "total_conversations": len(data.get("conversations", [])),
            "log_file": str(self.current_log_file),
        }
