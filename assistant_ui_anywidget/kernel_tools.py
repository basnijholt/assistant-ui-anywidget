"""Kernel-specific tools for LangGraph agent."""

from typing import Any, Dict, List, Optional, Type
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from .kernel_interface import KernelInterface
from .module_inspector import ModuleInspector


class InspectVariableInput(BaseModel):
    """Input for inspect_variable tool."""

    variable_name: str = Field(description="Name of the variable to inspect")
    deep: bool = Field(
        default=False,
        description="Whether to perform deep inspection including attributes",
    )


class ExecuteCodeInput(BaseModel):
    """Input for execute_code tool."""

    code: str = Field(description="Python code to execute in the kernel")
    silent: bool = Field(
        default=False,
        description="Whether to execute silently without storing in history",
    )


class GetVariablesInput(BaseModel):
    """Input for get_variables tool."""

    include_private: bool = Field(
        default=False,
        description="Whether to include private variables (starting with _)",
    )
    type_filter: Optional[str] = Field(
        default=None,
        description="Filter variables by type (e.g., 'DataFrame', 'int', 'function')",
    )


class InspectVariableTool(BaseTool):
    """Tool for inspecting variables in the kernel."""

    name: str = "inspect_variable"
    description: str = (
        "Inspect a variable in the Jupyter kernel to get detailed information. Use this when users ask "
        "'what is in [variable]', 'show me [variable]', or want details about a specific variable. "
        "Returns type, size, shape (for arrays/dataframes), and a preview of the data."
    )
    args_schema: Type[BaseModel] = InspectVariableInput
    kernel: Any = Field(default=None, exclude=True)  # Exclude from serialization

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self, variable_name: str, deep: bool = False) -> str:
        """Inspect a variable and return formatted information."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        var_info = self.kernel.get_variable_info(variable_name, deep=deep)
        if var_info is None:
            return f"Variable '{variable_name}' not found in namespace"

        # Format the information nicely
        lines = [
            f"Variable: {var_info.name}",
            f"Type: {var_info.type_str}",
            f"Size: {var_info.size} bytes" if var_info.size else "Size: Unknown",
        ]

        if var_info.shape:
            lines.append(f"Shape: {var_info.shape}")

        lines.append(f"Callable: {'Yes' if var_info.is_callable else 'No'}")
        lines.append(f"\nPreview:\n{var_info.preview}")

        if deep and var_info.attributes:
            lines.append(f"\nAttributes ({len(var_info.attributes)}):")
            for attr in var_info.attributes[:20]:  # Limit to first 20
                lines.append(f"  - {attr}")
            if len(var_info.attributes) > 20:
                lines.append(f"  ... and {len(var_info.attributes) - 20} more")

        return "\n".join(lines)


class ExecuteCodeTool(BaseTool):
    """Tool for executing code in the kernel."""

    name: str = "execute_code"
    description: str = (
        "Execute Python code in the Jupyter kernel. Use this whenever a user asks you to 'run', 'execute', "
        "or 'calculate' something. Examples: df.info(), df.head(), calculations, creating plots, etc. "
        "This tool runs the exact code you provide and returns the output."
    )
    args_schema: Type[BaseModel] = ExecuteCodeInput
    return_direct: bool = False  # Don't return directly to user
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self, code: str, silent: bool = False) -> str:
        """Execute code and return the result."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        result = self.kernel.execute_code(code, silent=silent)

        lines = []

        if result.success:
            lines.append("Code executed successfully.")

            if result.outputs:
                lines.append("\nOutput:")
                for output in result.outputs:
                    if output["type"] == "execute_result":
                        lines.append(output["data"]["text/plain"])
                    elif output["type"] == "stream":
                        lines.append(output["text"])

            if result.variables_changed:
                lines.append(
                    f"\nVariables changed: {', '.join(result.variables_changed)}"
                )
        else:
            lines.append("Code execution failed.")
            if result.error:
                lines.append(
                    f"\nError: {result.error['type']}: {result.error['message']}"
                )
                if result.error.get("traceback"):
                    lines.append("\nTraceback:")
                    lines.append(
                        "\n".join(result.error["traceback"][-5:])
                    )  # Last 5 lines

        return "\n".join(lines)


class GetVariablesTool(BaseTool):
    """Tool for listing variables in the kernel."""

    name: str = "get_variables"
    description: str = (
        "Get a list of all variables in the Jupyter kernel namespace. Use this when users ask to "
        "'show variables', 'list variables', or want to see what's available in the kernel."
    )
    args_schema: Type[BaseModel] = GetVariablesInput
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(
        self, include_private: bool = False, type_filter: Optional[str] = None
    ) -> str:
        """List variables in the namespace."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        namespace = self.kernel.get_namespace()

        # Group variables by type
        vars_by_type: Dict[str, List[str]] = {}

        for name, value in namespace.items():
            if not include_private and name.startswith("_"):
                continue

            type_name = type(value).__name__

            if type_filter and type_filter.lower() not in type_name.lower():
                continue

            if type_name not in vars_by_type:
                vars_by_type[type_name] = []
            vars_by_type[type_name].append(name)

        # Format the output
        lines = [f"Variables in namespace ({len(namespace)} total):"]

        for type_name in sorted(vars_by_type.keys()):
            var_names = sorted(vars_by_type[type_name])
            lines.append(f"\n{type_name} ({len(var_names)}):")
            for name in var_names[:10]:  # Show first 10 of each type
                lines.append(f"  - {name}")
            if len(var_names) > 10:
                lines.append(f"  ... and {len(var_names) - 10} more")

        return "\n".join(lines)


class KernelInfoTool(BaseTool):
    """Tool for getting kernel information."""

    name: str = "kernel_info"
    description: str = "Get information about the current kernel state including availability and execution count."
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self) -> str:
        """Get kernel information."""
        info = self.kernel.get_kernel_info()

        lines = [
            f"Kernel Status: {info['status']}",
            f"Available: {'Yes' if info['available'] else 'No'}",
        ]

        # Only add detailed info if kernel is available
        if info["available"]:
            lines.extend(
                [
                    f"Language: {info.get('language', 'Unknown')}",
                    f"Execution Count: {info.get('execution_count', 0)}",
                    f"Variables in Namespace: {info.get('namespace_size', 0)}",
                ]
            )

            if info.get("variables_by_type"):
                lines.append("\nVariables by Type:")
                for type_name, count in info["variables_by_type"].items():
                    lines.append(f"  - {type_name}: {count}")
        else:
            lines.append(
                "No additional information available when kernel is not connected."
            )

        return "\n".join(lines)


class GetNotebookStateInput(BaseModel):
    """Input for get_notebook_state tool."""

    recent_only: bool = Field(
        default=True,
        description="Whether to return only recent cells or all cells",
    )
    limit: int = Field(
        default=10,
        description="Maximum number of cells to return",
    )


class SearchNotebookInput(BaseModel):
    """Input for search_notebook tool."""

    search_term: str = Field(description="Term to search for in cell contents")
    case_sensitive: bool = Field(
        default=False,
        description="Whether the search should be case sensitive",
    )


class GetCellInput(BaseModel):
    """Input for get_cell tool."""

    cell_number: int = Field(description="Cell execution number to retrieve")


class GetNotebookStateTool(BaseTool):
    """Tool for getting notebook state including all cells."""

    name: str = "get_notebook_state"
    description: str = (
        "Get the current state of the Jupyter notebook including cell contents and outputs. "
        "Use this to understand what has been executed in the notebook, see previous results, "
        "or get context about the user's work. Very helpful for debugging or building on previous work."
    )
    args_schema: Type[BaseModel] = GetNotebookStateInput
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self, recent_only: bool = True, limit: int = 10) -> str:
        """Get notebook state."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        notebook_state = self.kernel.get_notebook_state()

        if not notebook_state.cells:
            return "No cells have been executed in this notebook yet."

        lines = [
            "Notebook State Summary:",
            f"Total cells: {notebook_state.total_cells}",
            f"Executed cells: {notebook_state.executed_cells}",
            f"Current execution count: {notebook_state.current_execution_count}",
            "",
        ]

        # Get cells to display
        cells_to_show = notebook_state.cells
        if recent_only:
            # Show most recent executed cells
            executed_cells = [c for c in notebook_state.cells if c.has_output]
            cells_to_show = sorted(
                executed_cells, key=lambda x: x.execution_count or 0, reverse=True
            )[:limit]
        else:
            cells_to_show = cells_to_show[:limit]

        if not cells_to_show:
            lines.append("No executed cells to display.")
            return "\n".join(lines)

        lines.append(
            f"{'Recent' if recent_only else 'First'} {len(cells_to_show)} cells:"
        )
        lines.append("")

        for cell in cells_to_show:
            lines.append(f"Cell [{cell.execution_count or 'not executed'}]:")
            lines.append("Input:")
            lines.append(f"```python\n{cell.input_code}\n```")

            if cell.has_output and cell.output is not None:
                output_str = str(cell.output)
                if len(output_str) > 200:
                    output_str = output_str[:200] + "..."
                lines.append(f"Output: {output_str}")
            else:
                lines.append("Output: (no output)")
            lines.append("")

        return "\n".join(lines)


class SearchNotebookTool(BaseTool):
    """Tool for searching notebook cells by content."""

    name: str = "search_notebook"
    description: str = (
        "Search through notebook cells for specific content. Useful when you need to find "
        "where something was defined, used, or calculated in previous cells."
    )
    args_schema: Type[BaseModel] = SearchNotebookInput
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self, search_term: str, case_sensitive: bool = False) -> str:
        """Search notebook cells."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        matching_cells = self.kernel.search_cells_by_content(
            search_term, case_sensitive
        )

        if not matching_cells:
            return f"No cells found containing '{search_term}'"

        lines = [
            f"Found {len(matching_cells)} cell(s) containing '{search_term}':",
            "",
        ]

        for cell in matching_cells[:5]:  # Limit to first 5 matches
            lines.append(f"Cell [{cell.execution_count or 'not executed'}]:")
            lines.append(f"```python\n{cell.input_code}\n```")

            if cell.has_output and cell.output is not None:
                output_str = str(cell.output)
                if len(output_str) > 100:
                    output_str = output_str[:100] + "..."
                lines.append(f"Output: {output_str}")
            lines.append("")

        if len(matching_cells) > 5:
            lines.append(f"... and {len(matching_cells) - 5} more matches")

        return "\n".join(lines)


class GetCellTool(BaseTool):
    """Tool for getting a specific cell by number."""

    name: str = "get_cell"
    description: str = (
        "Get a specific notebook cell by its execution number. Use this when you need to "
        "see the exact content and output of a particular cell."
    )
    args_schema: Type[BaseModel] = GetCellInput
    kernel: Any = Field(default=None, exclude=True)

    def __init__(self, kernel: KernelInterface, **kwargs: Any) -> None:
        super().__init__(kernel=kernel, **kwargs)

    def _run(self, cell_number: int) -> str:
        """Get specific cell."""
        if not self.kernel.is_available:
            return "Kernel is not available"

        cell = self.kernel.get_cell_by_number(cell_number)

        if not cell:
            return f"Cell [{cell_number}] not found"

        lines = [
            f"Cell [{cell.execution_count or 'not executed'}]:",
            "Input:",
            f"```python\n{cell.input_code}\n```",
        ]

        if cell.has_output and cell.output is not None:
            lines.append(f"Output: {cell.output}")
        else:
            lines.append("Output: (no output)")

        return "\n".join(lines)


class ReadModuleSourceInput(BaseModel):
    """Input for read_module_source tool."""

    module_name: str = Field(
        description="Name of the module (e.g., 'my_package.my_module')"
    )
    function_name: Optional[str] = Field(
        default=None,
        description="Optional: specific function/class to read within the module",
    )


class ReadSourceFromErrorInput(BaseModel):
    """Input for read_source_from_error tool."""

    error_traceback: List[str] = Field(
        description="List of traceback lines from the error"
    )
    context_lines: int = Field(
        default=5, description="Number of lines to show before and after the error line"
    )


class ReadModuleSourceTool(BaseTool):
    """Tool for reading source code of imported modules."""

    name: str = "read_module_source"
    description: str = (
        "Read the source code of an imported module or a specific function/class within it. "
        "Use this when debugging errors that occur inside user packages or when users want to "
        "understand how their imported code works. Only works for Python modules, not built-ins."
    )
    args_schema: Type[BaseModel] = ReadModuleSourceInput

    def _run(self, module_name: str, function_name: Optional[str] = None) -> str:
        """Read module or function source code."""
        if function_name:
            source = ModuleInspector.get_function_source(module_name, function_name)
            if source:
                return f"Source of {module_name}.{function_name}:\n\n```python\n{source}\n```"
            else:
                return f"Could not find function '{function_name}' in module '{module_name}'"
        else:
            source = ModuleInspector.get_module_source(module_name)
            if source:
                # Limit to first 1000 lines for very large modules
                lines = source.splitlines()
                if len(lines) > 1000:
                    source = "\n".join(lines[:1000])
                    source += f"\n\n... (truncated, showing first 1000 lines of {len(lines)} total)"
                return f"Source of module {module_name}:\n\n```python\n{source}\n```"
            else:
                return f"Could not read source for module '{module_name}'. It may be a built-in or compiled module."


class ReadSourceFromErrorTool(BaseTool):
    """Tool for reading source code from error tracebacks."""

    name: str = "read_source_from_error"
    description: str = (
        "Extract file references from an error traceback and read the relevant source code. "
        "This is extremely useful for debugging - it shows the exact code that caused the error "
        "with context lines before and after. Use this immediately when you see an error traceback."
    )
    args_schema: Type[BaseModel] = ReadSourceFromErrorInput

    def _run(self, error_traceback: List[str], context_lines: int = 5) -> str:
        """Read source code from error traceback."""
        references = ModuleInspector.find_in_traceback(error_traceback)

        if not references:
            return "No file references found in the traceback"

        results = []
        for file_path, line_num, func_name in references:
            # Skip standard library files
            if "site-packages" in file_path or "dist-packages" in file_path:
                continue

            source = ModuleInspector.read_source_around_line(
                file_path, line_num, context_lines
            )
            if source:
                results.append(
                    f"File: {file_path}\nFunction: {func_name}\nLine {line_num}:\n\n{source}"
                )

        if not results:
            return "Could not read source code from the traceback (files may be from standard library)"

        return "\n\n" + ("=" * 50) + "\n\n".join(results)


class ListUserModulesInput(BaseModel):
    """Input for list_user_modules tool."""

    pattern: Optional[str] = Field(
        default=None, description="Optional pattern to filter module names"
    )


class ListUserModulesTool(BaseTool):
    """Tool for listing user-imported modules."""

    name: str = "list_user_modules"
    description: str = (
        "List all user-imported modules (excluding standard library and installed packages). "
        "This shows which custom modules are available to inspect. Useful for understanding "
        "the structure of the user's code."
    )
    args_schema: Type[BaseModel] = ListUserModulesInput

    def _run(self, pattern: Optional[str] = None) -> str:
        """List user modules."""
        modules = ModuleInspector.get_user_modules()

        if not modules:
            return "No user modules found in sys.modules"

        # Filter by pattern if provided
        if pattern:
            pattern_lower = pattern.lower()
            modules = {
                name: path
                for name, path in modules.items()
                if pattern_lower in name.lower()
            }

            if not modules:
                return f"No user modules found matching pattern '{pattern}'"

        lines = [f"User modules ({len(modules)} found):"]
        for name, path in sorted(modules.items()):
            lines.append(f"  - {name}: {path}")

        return "\n".join(lines)


def create_kernel_tools(kernel: KernelInterface) -> List[BaseTool]:
    """Create all kernel tools for the agent."""
    return [
        # Variable inspection
        InspectVariableTool(kernel),
        GetVariablesTool(kernel),
        # Code execution
        ExecuteCodeTool(kernel),
        # Kernel info
        KernelInfoTool(kernel),
        # Notebook state
        GetNotebookStateTool(kernel),
        SearchNotebookTool(kernel),
        GetCellTool(kernel),
        # Module inspection (new!)
        ReadModuleSourceTool(),
        ReadSourceFromErrorTool(),
        ListUserModulesTool(),
    ]
