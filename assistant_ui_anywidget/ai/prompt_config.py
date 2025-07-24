"""System prompt configuration using pydantic-settings."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class SystemPromptConfig(BaseSettings):
    """System prompt configuration loaded from YAML file."""

    approval_note: str
    main_prompt: str
    slash_commands: str
    examples_of_proactive_behavior: str
    scientific_computing_awareness: str
    final_reminder: str

    def get_full_prompt(self, require_approval: bool = True) -> str:
        """Combine all sections into the complete system prompt."""
        prompt_parts = [self.main_prompt]
        if require_approval:
            prompt_parts.append(self.approval_note)
        prompt_parts.extend(
            [
                self.slash_commands,
                self.examples_of_proactive_behavior,
                self.scientific_computing_awareness,
                self.final_reminder,
            ]
        )
        return "\n\n".join(prompt_parts)

    model_config = SettingsConfigDict(
        yaml_file=Path(__file__).parent / "system_prompt.yaml",
        extra="forbid",
    )
