"""Module inspection utilities for reading source code of imported modules."""

import inspect
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple


class ModuleInspector:
    """Utilities for inspecting imported modules and reading their source code."""

    @staticmethod
    def get_user_modules() -> Dict[str, str]:
        """Get all user-imported modules (excluding standard library and installed packages).

        Returns:
            Dict mapping module names to their file paths
        """
        user_modules = {}

        for name, module in sys.modules.items():
            # Skip None modules (can happen with failed imports)
            if module is None:
                continue  # type: ignore[unreachable]

            # Skip built-in modules
            if not hasattr(module, "__file__") or module.__file__ is None:
                continue

            module_path = Path(module.__file__)

            # Skip standard library (usually in python install dir)
            if "site-packages" in str(module_path) or "dist-packages" in str(
                module_path
            ):
                continue

            # Skip paths that don't exist
            if not module_path.exists():
                continue

            # Only include .py files (skip .so, .pyd, etc.)
            if module_path.suffix != ".py":
                continue

            user_modules[name] = str(module_path)

        return user_modules

    @staticmethod
    def get_module_source(module_name: str) -> Optional[str]:
        """Get the source code of a module by name.

        Args:
            module_name: Name of the module (e.g., 'my_package.my_module')

        Returns:
            Source code as string, or None if not found
        """
        if module_name not in sys.modules:
            return None

        module = sys.modules[module_name]

        try:
            return inspect.getsource(module)
        except (TypeError, OSError):
            # Try reading the file directly
            if hasattr(module, "__file__") and module.__file__:
                try:
                    return Path(module.__file__).read_text()
                except Exception:
                    pass

        return None

    @staticmethod
    def get_function_source(module_name: str, function_name: str) -> Optional[str]:
        """Get the source code of a specific function in a module.

        Args:
            module_name: Name of the module
            function_name: Name of the function

        Returns:
            Source code of the function, or None if not found
        """
        if module_name not in sys.modules:
            return None

        module = sys.modules[module_name]

        if not hasattr(module, function_name):
            return None

        obj = getattr(module, function_name)

        try:
            return inspect.getsource(obj)
        except (TypeError, OSError):
            return None

    @staticmethod
    def find_in_traceback(tb_lines: List[str]) -> List[Tuple[str, int, Optional[str]]]:
        """Extract module references from a traceback.

        Args:
            tb_lines: List of traceback lines

        Returns:
            List of (module_path, line_number, function_name) tuples
        """
        import re

        references = []
        pattern = r'File "([^"]+)", line (\d+), in (.+)'

        for line in tb_lines:
            match = re.match(pattern, line.strip())
            if match:
                file_path, line_num, func_name = match.groups()
                references.append((file_path, int(line_num), func_name))

        return references

    @staticmethod
    def read_source_around_line(
        file_path: str, line_number: int, context: int = 5
    ) -> Optional[str]:
        """Read source code around a specific line number.

        Args:
            file_path: Path to the source file
            line_number: Target line number (1-indexed)
            context: Number of lines to show before and after

        Returns:
            Source code snippet with line numbers
        """
        try:
            path = Path(file_path)
            if not path.exists():
                return None

            lines = path.read_text().splitlines()

            # Calculate range (1-indexed to 0-indexed)
            start = max(0, line_number - context - 1)
            end = min(len(lines), line_number + context)

            # Format with line numbers
            result = []
            for i in range(start, end):
                line_num = i + 1
                marker = ">>>" if line_num == line_number else "   "
                result.append(f"{marker} {line_num:4d} | {lines[i]}")

            return "\n".join(result)

        except Exception:
            return None
