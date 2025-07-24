"""Pydantic models for system prompt configuration."""

from pydantic import BaseModel, Field


class SystemPromptConfig(BaseModel):
    """Configuration for the AI assistant system prompt.

    This model ensures all fields from the YAML file are properly loaded
    and provides type safety and validation.
    """

    approval_note: str = Field(
        ...,
        description="Instructions about tool usage and approval requirements",
    )
    main_prompt: str = Field(
        ...,
        description="The main system prompt defining the assistant's personality and behavior",
    )
    slash_commands: str = Field(
        ...,
        description="Documentation of available slash commands",
    )
    examples_of_proactive_behavior: str = Field(
        ...,
        description="Concrete examples of ultra-proactive assistant behavior",
    )
    scientific_computing_awareness: str = Field(
        ...,
        description="Guidelines for scientific computing assistance",
    )
    final_reminder: str = Field(
        ...,
        description="Final motivational reminder about being proactive",
    )

    def get_full_prompt(self, require_approval: bool = True) -> str:
        """Combine all sections into the complete system prompt.

        Args:
            require_approval: Whether to include approval-related instructions

        Returns:
            The complete system prompt as a single string
        """
        prompt_parts = [self.main_prompt]
        if require_approval:
            prompt_parts.append(self.approval_note)
        prompt_parts.append(self.slash_commands)
        prompt_parts.append(self.examples_of_proactive_behavior)
        prompt_parts.append(self.scientific_computing_awareness)
        prompt_parts.append(self.final_reminder)
        return "\n\n".join(part for part in prompt_parts if part)

    class Config:
        """Pydantic configuration."""

        # Allow extra fields in case we add more sections to the YAML
        extra = "forbid"  # This will raise an error if unknown fields are present
        # Validate on assignment
        validate_assignment = True
