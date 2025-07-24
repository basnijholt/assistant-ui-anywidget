"""Tests for git-native kernel tools."""

import subprocess
import tempfile
from pathlib import Path
from typing import Any, Generator
from langchain_core.tools import BaseTool
from unittest.mock import patch

import pytest

from assistant_ui_anywidget.kernel_tools import GitFindTool, GitGrepTool, ListFilesTool


class TestGitNativeTools:
    """Test git-native kernel tools functionality."""

    @pytest.fixture  # type: ignore[misc]
    def git_repo(self) -> Generator[Path, None, None]:
        """Create a temporary git repository for testing."""
        with tempfile.TemporaryDirectory() as tmpdir:
            repo_path = Path(tmpdir)

            # Initialize git repo
            subprocess.run(["git", "init"], cwd=repo_path, check=True)
            subprocess.run(
                ["git", "config", "user.name", "Test User"], cwd=repo_path, check=True
            )
            subprocess.run(
                ["git", "config", "user.email", "test@example.com"],
                cwd=repo_path,
                check=True,
            )

            # Create test files
            (repo_path / "main.py").write_text(
                "def main():\n    print('Hello World')\n"
            )
            (repo_path / "config.yaml").write_text("database:\n  host: localhost\n")
            (repo_path / "test_main.py").write_text(
                "def test_main():\n    assert True\n"
            )
            (repo_path / "build").mkdir()
            (repo_path / "build" / "output.log").write_text("Build log content\n")
            (repo_path / "untracked.txt").write_text("This file is not tracked\n")

            # Add and commit tracked files
            subprocess.run(
                ["git", "add", "main.py", "config.yaml", "test_main.py"],
                cwd=repo_path,
                check=True,
            )
            subprocess.run(
                ["git", "commit", "-m", "Initial commit"], cwd=repo_path, check=True
            )

            yield repo_path

    def test_list_files_git_tracked_only(self, git_repo: Path) -> None:
        """Test listing only git-tracked files."""
        tool = ListFilesTool()

        result = tool._run(directory=str(git_repo), git_tracked_only=True)

        assert "git-tracked only" in result
        assert "main.py" in result
        assert "config.yaml" in result
        assert "test_main.py" in result
        assert "untracked.txt" not in result
        assert "output.log" not in result

    def test_list_files_all_files(self, git_repo: Path) -> None:
        """Test listing all files including untracked."""
        tool = ListFilesTool()

        result = tool._run(directory=str(git_repo), git_tracked_only=False)

        assert "all files" in result
        assert "main.py" in result
        assert "config.yaml" in result
        assert "test_main.py" in result
        assert "untracked.txt" in result

    def test_list_files_with_pattern(self, git_repo: Path) -> None:
        """Test listing files with pattern matching."""
        tool = ListFilesTool()

        result = tool._run(
            directory=str(git_repo), git_tracked_only=True, pattern="*.py"
        )

        assert "main.py" in result
        assert "test_main.py" in result
        assert "config.yaml" not in result

    def test_list_files_non_git_repo(self) -> None:
        """Test behavior when not in a git repository."""
        tool = ListFilesTool()

        with tempfile.TemporaryDirectory() as tmpdir:
            result = tool._run(directory=tmpdir, git_tracked_only=True)

        assert "Not a git repository" in result
        assert "Use git_tracked_only=False" in result

    def test_git_grep_basic_search(self, git_repo: Path) -> None:
        """Test basic git grep functionality."""
        tool = GitGrepTool()

        # Mock subprocess.run to work within the git_repo directory
        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(search_term="def main")

        assert "Found" in result
        assert "main.py" in result
        assert "def main" in result

    def test_git_grep_case_sensitive(self, git_repo: Path) -> None:
        """Test case-sensitive git grep."""
        tool = GitGrepTool()

        # Mock subprocess.run to work within the git_repo directory
        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            # Case-insensitive (default)
            result_insensitive = tool._run(search_term="HELLO")
            assert "Hello World" in result_insensitive

            # Case-sensitive
            result_sensitive = tool._run(search_term="HELLO", case_sensitive=True)
            assert "No matches found" in result_sensitive

    def test_git_grep_with_file_pattern(self, git_repo: Path) -> None:
        """Test git grep with file pattern filter."""
        tool = GitGrepTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(search_term="def", file_pattern="*.py")

        assert "def main" in result
        assert "def test_main" in result

    def test_git_grep_no_matches(self, git_repo: Path) -> None:
        """Test git grep when no matches found."""
        tool = GitGrepTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(search_term="nonexistent_text")

        assert "No matches found" in result

    def test_git_grep_non_git_repo(self) -> None:
        """Test git grep behavior when not in a git repository."""
        tool = GitGrepTool()

        with tempfile.TemporaryDirectory() as tmpdir:
            original_run = subprocess.run

            def mock_run(cmd: Any, **kwargs: Any) -> Any:
                if "cwd" not in kwargs:
                    kwargs["cwd"] = tmpdir
                return original_run(cmd, **kwargs)

            with patch("subprocess.run", side_effect=mock_run):
                result = tool._run(search_term="test")

        assert "Not a git repository" in result

    def test_git_find_basic_search(self, git_repo: Path) -> None:
        """Test basic git find functionality."""
        tool = GitFindTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(name_pattern="*.py")

        assert "main.py" in result
        assert "test_main.py" in result
        assert "config.yaml" not in result

    def test_git_find_exact_name(self, git_repo: Path) -> None:
        """Test finding exact filename."""
        tool = GitFindTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(name_pattern="config.yaml")

        assert "config.yaml" in result
        assert "main.py" not in result

    def test_git_find_case_sensitive(self, git_repo: Path) -> None:
        """Test case-sensitive git find."""
        tool = GitFindTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            # Case-insensitive (default)
            result_insensitive = tool._run(name_pattern="MAIN.PY")
            assert "main.py" in result_insensitive

            # Case-sensitive
            result_sensitive = tool._run(name_pattern="MAIN.PY", case_sensitive=True)
            assert "No git-tracked files found" in result_sensitive

    def test_git_find_no_matches(self, git_repo: Path) -> None:
        """Test git find when no matches found."""
        tool = GitFindTool()

        original_run = subprocess.run

        def mock_run(cmd: Any, **kwargs: Any) -> Any:
            if "cwd" not in kwargs:
                kwargs["cwd"] = str(git_repo)
            return original_run(cmd, **kwargs)

        with patch("subprocess.run", side_effect=mock_run):
            result = tool._run(name_pattern="*.nonexistent")

        assert "No git-tracked files found" in result

    def test_git_find_non_git_repo(self) -> None:
        """Test git find behavior when not in a git repository."""
        tool = GitFindTool()

        with tempfile.TemporaryDirectory() as tmpdir:
            original_run = subprocess.run

            def mock_run(cmd: Any, **kwargs: Any) -> Any:
                if "cwd" not in kwargs:
                    kwargs["cwd"] = tmpdir
                return original_run(cmd, **kwargs)

            with patch("subprocess.run", side_effect=mock_run):
                result = tool._run(name_pattern="*.py")

        assert "Not a git repository" in result

    def test_error_handling(self) -> None:
        """Test error handling in git tools."""
        tools = [ListFilesTool(), GitGrepTool(), GitFindTool()]

        # Test with invalid directory
        for tool in tools:
            if hasattr(tool, "_run"):
                with patch(
                    "subprocess.run",
                    side_effect=subprocess.CalledProcessError(1, "git"),
                ):
                    if isinstance(tool, ListFilesTool):
                        result = tool._run(
                            directory="/nonexistent", git_tracked_only=True
                        )
                    elif isinstance(tool, GitGrepTool):
                        result = tool._run(search_term="test")
                    else:  # GitFindTool
                        result = tool._run(name_pattern="*.py")

                    assert "Error" in result or "Not a git repository" in result

    def test_tools_have_correct_names(self) -> None:
        """Test that tools have the expected names."""
        assert ListFilesTool().name == "list_files"
        assert GitGrepTool().name == "git_grep"
        assert GitFindTool().name == "git_find"

    def test_tools_have_descriptions(self) -> None:
        """Test that tools have proper descriptions."""
        tools = [ListFilesTool(), GitGrepTool(), GitFindTool()]

        for tool in tools:
            assert isinstance(tool, BaseTool)
            assert tool.description
            assert len(tool.description) > 50  # Ensure substantial description
            assert "git" in tool.description.lower()
