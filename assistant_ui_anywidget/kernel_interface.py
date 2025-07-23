"""Kernel interface for interacting with the IPython kernel."""

import sys
import traceback
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

try:
    from IPython import get_ipython
    from IPython.core.interactiveshell import InteractiveShell
except ImportError:
    get_ipython = None
    InteractiveShell = None


@dataclass
class VariableInfo:
    """Information about a variable in the kernel namespace."""

    name: str
    type: str
    type_str: str
    size: Optional[int]
    shape: Optional[List[int]]
    preview: str
    is_callable: bool
    attributes: List[str]
    last_modified: Optional[float]

    def to_dict(self) -> dict:
        """Convert to dictionary for serialization."""
        return {
            "name": self.name,
            "type": self.type,
            "type_str": self.type_str,
            "size": self.size,
            "shape": self.shape,
            "preview": self.preview,
            "is_callable": self.is_callable,
            "attributes": self.attributes,
            "last_modified": self.last_modified,
        }


@dataclass
class ExecutionResult:
    """Result of code execution in the kernel."""

    success: bool
    execution_count: int
    outputs: List[Dict[str, Any]]
    execution_time: float
    variables_changed: List[str]
    error: Optional[Dict[str, Any]] = None

    def to_dict(self) -> dict:
        """Convert to dictionary for serialization."""
        return {
            "success": self.success,
            "execution_count": self.execution_count,
            "outputs": self.outputs,
            "execution_time": self.execution_time,
            "variables_changed": self.variables_changed,
            "error": self.error,
        }


@dataclass
class StackFrame:
    """Information about a stack frame."""

    filename: str
    line_number: int
    function_name: str
    source: Optional[List[str]]
    locals: Optional[Dict[str, Any]]
    is_current: bool

    def to_dict(self) -> dict:
        """Convert to dictionary for serialization."""
        return {
            "filename": self.filename,
            "line_number": self.line_number,
            "function_name": self.function_name,
            "source": self.source,
            "locals": {k: str(v) for k, v in (self.locals or {}).items()},
            "is_current": self.is_current,
        }


class KernelInterface:
    """Interface for interacting with the IPython kernel."""

    def __init__(self) -> None:
        """Initialize the kernel interface."""
        self.shell: Optional[InteractiveShell] = get_ipython() if get_ipython else None
        self._namespace_snapshot: Dict[str, Any] = {}

    @property
    def is_available(self) -> bool:
        """Check if kernel is available."""
        return self.shell is not None

    def get_namespace(self) -> Dict[str, Any]:
        """Get current namespace variables."""
        if not self.is_available:
            return {}

        # Filter out IPython internals and private variables
        namespace: Dict[str, Any] = {}
        if self.shell is None:
            return namespace
        for name, value in self.shell.user_ns.items():
            if not name.startswith("_") and name not in (
                "In",
                "Out",
                "get_ipython",
                "exit",
                "quit",
            ):
                namespace[name] = value

        return namespace

    def get_variable_info(
        self, var_name: str, deep: bool = False
    ) -> Optional[VariableInfo]:
        """Get detailed information about a variable."""
        if not self.is_available:
            return None

        if self.shell is None:
            return None
        namespace = self.shell.user_ns
        if var_name not in namespace:
            return None

        value = namespace[var_name]

        # Get type information
        type_obj = type(value)
        type_name = type_obj.__name__
        type_str = f"{type_obj.__module__}.{type_obj.__qualname__}"

        # Get size information
        size = None
        shape = None

        try:
            # For numpy arrays, pandas dataframes, etc.
            if hasattr(value, "nbytes"):
                size = int(value.nbytes)
            elif hasattr(value, "__sizeof__"):
                size = sys.getsizeof(value)

            if hasattr(value, "shape"):
                shape = list(value.shape)
        except Exception:
            pass

        # Get preview
        preview = self._get_preview(value)

        # Get attributes (limited to prevent overwhelming output)
        attributes = []
        if deep:
            try:
                attrs = dir(value)
                # Filter out private attributes unless specifically requested
                attributes = [a for a in attrs if not a.startswith("__")][:50]
            except Exception:
                pass

        return VariableInfo(
            name=var_name,
            type=type_name,
            type_str=type_str,
            size=size,
            shape=shape,
            preview=preview,
            is_callable=callable(value),
            attributes=attributes,
            last_modified=None,  # Could implement tracking
        )

    def _get_preview(self, value: Any, max_length: int = 100) -> str:
        """Get a preview string for a value."""
        try:
            # Special handling for common types
            if hasattr(value, "head") and callable(value.head):
                # Pandas DataFrame
                return str(value.head(3))
            elif hasattr(value, "shape") and hasattr(value, "dtype"):
                # NumPy array
                return f"array(shape={value.shape}, dtype={value.dtype})"
            else:
                # General case
                preview = repr(value)
                if len(preview) > max_length:
                    preview = preview[:max_length] + "..."
                return preview
        except Exception:
            return "<unable to generate preview>"

    def execute_code(
        self, code: str, silent: bool = False, store_history: bool = True
    ) -> ExecutionResult:
        """Execute code in the kernel and capture output."""
        if not self.is_available:
            return ExecutionResult(
                success=False,
                execution_count=0,
                outputs=[],
                execution_time=0.0,
                variables_changed=[],
                error={"type": "KernelError", "message": "Kernel not available"},
            )

        # Take snapshot of variables before execution
        before_vars = set(self.get_namespace().keys())

        # Execute the code
        import time
        import io
        from contextlib import redirect_stdout, redirect_stderr

        start_time = time.time()
        stdout_buffer = io.StringIO()
        stderr_buffer = io.StringIO()

        try:
            if self.shell is None:
                raise RuntimeError("Kernel not available")

            # Capture stdout and stderr
            with redirect_stdout(stdout_buffer), redirect_stderr(stderr_buffer):
                result = self.shell.run_cell(
                    code, silent=silent, store_history=store_history
                )

            execution_time = time.time() - start_time

            # Detect changed variables
            after_vars = set(self.get_namespace().keys())
            new_vars = after_vars - before_vars
            # Also check for modified variables by comparing values
            modified_vars = []
            for var in before_vars & after_vars:
                try:
                    if self.shell and self.shell.user_ns[
                        var
                    ] is not self._namespace_snapshot.get(var):
                        modified_vars.append(var)
                except Exception:
                    pass

            variables_changed = list(new_vars) + modified_vars

            # Format outputs
            outputs = []

            # Capture stdout output
            stdout_text = stdout_buffer.getvalue()
            if stdout_text:
                stdout_output: Dict[str, Any] = {
                    "type": "stream",
                    "name": "stdout",
                    "text": stdout_text,
                }
                outputs.append(stdout_output)

            # Capture stderr output
            stderr_text = stderr_buffer.getvalue()
            if stderr_text:
                stderr_output: Dict[str, Any] = {
                    "type": "stream",
                    "name": "stderr",
                    "text": stderr_text,
                }
                outputs.append(stderr_output)

            # Capture result output
            if result.result is not None:
                result_output: Dict[str, Any] = {
                    "type": "execute_result",
                    "data": {"text/plain": repr(result.result)},
                    "execution_count": self.shell.execution_count if self.shell else 0,
                }
                outputs.append(result_output)

            # Handle errors
            if result.error_in_exec:
                return ExecutionResult(
                    success=False,
                    execution_count=self.shell.execution_count if self.shell else 0,
                    outputs=outputs,
                    execution_time=execution_time,
                    variables_changed=variables_changed,
                    error={
                        "type": type(result.error_in_exec).__name__,
                        "message": str(result.error_in_exec),
                        "traceback": self._format_traceback(result.error_in_exec),
                    },
                )

            return ExecutionResult(
                success=True,
                execution_count=self.shell.execution_count if self.shell else 0,
                outputs=outputs,
                execution_time=execution_time,
                variables_changed=variables_changed,
            )

        except Exception as e:
            return ExecutionResult(
                success=False,
                execution_count=self.shell.execution_count if self.shell else 0,
                outputs=[],
                execution_time=time.time() - start_time,
                variables_changed=[],
                error={
                    "type": type(e).__name__,
                    "message": str(e),
                    "traceback": traceback.format_exc().split("\n"),
                },
            )

    def _format_traceback(self, error: Exception) -> List[str]:
        """Format exception traceback."""
        try:
            return traceback.format_exception(type(error), error, error.__traceback__)
        except Exception:
            return [str(error)]

    def get_last_error(self) -> Optional[Dict[str, Any]]:
        """Get information about the last error."""
        if not self.is_available:
            return None

        # Get the last exception from IPython
        try:
            if not self.shell:
                return None
            etype, evalue, etb = self.shell._get_exc_info()
        except (AttributeError, ValueError):
            # AttributeError: Different IPython versions
            # ValueError: No exception to find
            return None

        if etype is None:
            return None

        return {
            "type": etype.__name__,
            "message": str(evalue),
            "traceback": self._format_traceback(evalue) if evalue else [],
        }

    def get_stack_trace(
        self, include_locals: bool = False, max_frames: int = 10
    ) -> List[StackFrame]:
        """Get current stack trace if available."""
        frames = []

        try:
            # Get current stack
            import inspect

            stack = inspect.stack()

            for i, frame_info in enumerate(stack[:max_frames]):
                frame = StackFrame(
                    filename=frame_info.filename,
                    line_number=frame_info.lineno,
                    function_name=frame_info.function,
                    source=[frame_info.code_context[0].rstrip()]
                    if frame_info.code_context
                    else None,
                    locals=dict(frame_info.frame.f_locals) if include_locals else None,
                    is_current=(i == 0),
                )
                frames.append(frame)

        except Exception:
            pass

        return frames

    def get_kernel_info(self) -> Dict[str, Any]:
        """Get information about the kernel."""
        if not self.is_available:
            return {"available": False, "status": "not_connected"}

        return {
            "available": True,
            "status": "idle",  # Could implement proper status tracking
            "language": "python",
            "language_version": sys.version,
            "execution_count": self.shell.execution_count if self.shell else 0,
            "namespace_size": len(self.get_namespace()),
        }

    def interrupt_execution(self) -> bool:
        """Interrupt current execution."""
        if not self.is_available:
            return False

        try:
            # This would need kernel manager access for proper implementation
            # For now, return False
            return False
        except Exception:
            return False
