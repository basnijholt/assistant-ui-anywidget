"""System prompt configuration using pydantic-settings."""

from pathlib import Path
from typing import Tuple, Type

from pydantic import ConfigDict
from pydantic_settings import (
    BaseSettings,
    PydanticBaseSettingsSource,
    YamlConfigSettingsSource,
)


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

    model_config = ConfigDict(extra="forbid")

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: Type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> Tuple[PydanticBaseSettingsSource, ...]:
        """Configure pydantic-settings to load from YAML file."""
        yaml_file = Path(__file__).parent / "system_prompt.yaml"
        return (
            init_settings,
            YamlConfigSettingsSource(settings_cls, yaml_file=yaml_file),
            env_settings,
            file_secret_settings,
        )
