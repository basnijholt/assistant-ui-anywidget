"""Kernel-specific tools for LangGraph agent."""

from typing import Any, Dict, List, Optional, Type
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from .kernel_interface import KernelInterface


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
            f"Language: {info['language']}",
            f"Execution Count: {info['execution_count']}",
            f"Variables in Namespace: {info['namespace_size']}",
        ]

        if info.get("variables_by_type"):
            lines.append("\nVariables by Type:")
            for type_name, count in info["variables_by_type"].items():
                lines.append(f"  - {type_name}: {count}")

        return "\n".join(lines)


def create_kernel_tools(kernel: KernelInterface) -> List[BaseTool]:
    """Create all kernel tools for the agent."""
    return [
        InspectVariableTool(kernel),
        ExecuteCodeTool(kernel),
        GetVariablesTool(kernel),
        KernelInfoTool(kernel),
    ]
