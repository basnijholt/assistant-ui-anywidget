# Guiding Principles for Development

This document outlines the core principles and practices for developing this project. Adhering to these guidelines ensures consistency, quality, and a focus on forward-looking development.

## 1. Core Philosophy

- **Embrace Change, Avoid Backward Compatibility**: This project has no end-users yet. Prioritize innovation and improvement over maintaining backward compatibility.
- **Simplicity is Key**: Implement the simplest possible solution. Avoid over-engineering or generalizing features prematurely.
- **Focus on the Task**: Implement only the requested feature, without adding extras.
- **Functional Over Classes**: Prefer a functional programming style for Python over complex class hierarchies.
- **Keep it DRY**: Don't Repeat Yourself. Reuse code wherever possible.
- **Be Ruthless with Code Removal**: Aggressively remove any unused code, including functions, imports, and variables.
- **Prefer dataclasses**: Use `dataclasses` that can be typed over dictionaries for better type safety and clarity.
- Do not wrap things in try-excepts unless it's necessary. Avoid wrapping things that should not fail.

## 2. Workflow

### Step 1: Understand the Context

- **Read the Plan**: Always start by reading `PLAN.md` for the current task.
- **Explore the Codebase**: List existing files and read the `README.md` to understand the project's structure and purpose.
- **Consult Documentation**: Review the Crew AI documentation (https://langchain-ai.github.io/langgraph/llms.txt and https://langchain-ai.github.io/langgraph/llms-full.txt) to understand agent capabilities.

### Step 2: Environment & Dependencies

- **Environment Setup**: Use `uv sync --all-extras` to install all dependencies and `source .venv/bin/activate` to activate the virtual environment.
- **Adding Packages**: Use `uv add <package_name>` for new dependencies or `uv add --dev <package_name>` for development-only packages.

### Step 3: Development & Git

- **Check for Changes**: Before starting, review the latest changes from the main branch with `git diff origin/main | cat`. Make sure to use `--no-pager`, or pipe the output to `cat`.
- **Commit Frequently**: Make small, frequent commits.
- **Atomic Commits**: Ensure each commit corresponds to a tested, working state.
- **Targeted Adds**: **NEVER** use `git add .`. Always add files individually (`git add <filename>`) to prevent committing unrelated changes.

### Step 4: Testing & Quality

- **Test Before Committing**: **NEVER** claim a task is complete without running `pytest` to ensure all tests pass.
- **Real AI Integration Testing**: Always run `python test_real_ai_integration.py` to test with actual AI providers (uses cheap Gemini 2.5 Flash by default). This catches integration issues that mock tests might miss.
- **Run Pre-commit Hooks**: Always run `pre-commit run --all-files` before committing to enforce code style and quality.
- **Handle Linter Issues**:
  - **False Positives**: The linter may incorrectly flag issues in `pyproject.toml`; these can be ignored.
  - **Test-Related Errors**: If a pre-commit fix breaks a test (e.g., by removing an unused but necessary fixture), suppress the warning with a `# noqa: <error_code>` comment.

### Step 5: Refactoring

- **Be Proactive**: Continuously look for opportunities to refactor and improve the codebase for better organization and readability.
- **Incremental Changes**: Refactor in small, testable steps. Run tests after each change and commit on success.

### Step 6: Viewing the Widget

- **Taking Screenshots**: To view the widget without Jupyter, use `python take_screenshot.py` from the project root.
- **Manual Screenshot**: From the frontend directory, run `npm run demo` then `npm run screenshot` in another terminal.
- **Screenshot Location**: Screenshots are saved to `frontend/screenshots/` with timestamps.
- **Use Cases**: This is helpful for visual verification, documentation, and sharing the widget appearance.

## 3. Critical "Don'ts"

- **DO NOT** manually edit the CLI help messages in `README.md`. They are auto-generated.
- **NEVER** use `git add .`.
- **NEVER** claim a task is done without passing all `pytest` tests.
