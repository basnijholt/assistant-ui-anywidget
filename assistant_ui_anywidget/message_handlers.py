"""Message handlers for the widget API protocol."""

import time
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from .kernel_interface import KernelInterface


@dataclass
class BaseMessage:
    """Base message structure."""

    id: str
    timestamp: float
    type: str
    version: str = "1.0.0"

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "type": self.type,
            "version": self.version,
        }


@dataclass
class Request(BaseMessage):
    """Request message."""

    params: Optional[Dict[str, Any]] = None

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        data = super().to_dict()
        if self.params:
            data["params"] = self.params
        return data


@dataclass
class Response:
    """Response message."""

    id: str
    timestamp: float
    type: str
    request_id: str
    success: bool
    version: str = "1.0.0"
    data: Optional[Any] = None
    error: Optional[Dict[str, Any]] = None

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        data = {
            "id": self.id,
            "timestamp": self.timestamp,
            "type": self.type,
            "version": self.version,
            "request_id": self.request_id,
            "success": self.success,
        }
        if self.data is not None:
            data["data"] = self.data
        if self.error:
            data["error"] = self.error
        return data


class ErrorCode:
    """Error codes for API responses."""

    UNKNOWN_ERROR = "UNKNOWN_ERROR"
    INVALID_REQUEST = "INVALID_REQUEST"
    PERMISSION_DENIED = "PERMISSION_DENIED"
    RATE_LIMITED = "RATE_LIMITED"
    VARIABLE_NOT_FOUND = "VARIABLE_NOT_FOUND"
    VARIABLE_TOO_LARGE = "VARIABLE_TOO_LARGE"
    INSPECTION_FAILED = "INSPECTION_FAILED"
    EXECUTION_ERROR = "EXECUTION_ERROR"
    EXECUTION_TIMEOUT = "EXECUTION_TIMEOUT"
    SYNTAX_ERROR = "SYNTAX_ERROR"
    KERNEL_NOT_READY = "KERNEL_NOT_READY"
    KERNEL_DEAD = "KERNEL_DEAD"
    KERNEL_BUSY = "KERNEL_BUSY"


class MessageHandlers:
    """Handles API messages for kernel interaction."""

    def __init__(self, kernel_interface: Optional[KernelInterface] = None):
        """Initialize message handlers."""
        self.kernel = kernel_interface or KernelInterface()
        self.handlers = {
            "get_variables": self.handle_get_variables,
            "inspect_variable": self.handle_inspect_variable,
            "execute_code": self.handle_execute_code,
            "get_kernel_info": self.handle_get_kernel_info,
            "get_stack_trace": self.handle_get_stack_trace,
            "get_history": self.handle_get_history,
        }
        self.execution_history: List[Dict[str, Any]] = []

    def handle_message(self, message: Any) -> Dict[str, Any]:
        """Route message to appropriate handler."""
        try:
            # Validate message structure
            if not isinstance(message, dict):
                return self._error_response(
                    "invalid", ErrorCode.INVALID_REQUEST, "Message must be a dictionary"
                )

            msg_type = message.get("type")
            if not msg_type:
                return self._error_response(
                    message.get("id", "unknown"),
                    ErrorCode.INVALID_REQUEST,
                    "Message type is required",
                )

            # Get handler
            handler = self.handlers.get(msg_type)
            if not handler:
                return self._error_response(
                    message.get("id", "unknown"),
                    ErrorCode.INVALID_REQUEST,
                    f"Unknown message type: {msg_type}",
                )

            # Check kernel availability for kernel-dependent operations
            if msg_type != "get_kernel_info" and not self.kernel.is_available:
                return self._error_response(
                    message.get("id", "unknown"),
                    ErrorCode.KERNEL_NOT_READY,
                    "Kernel is not available",
                )

            # Call handler
            return handler(message)

        except Exception as e:
            return self._error_response(
                message.get("id", "unknown"), ErrorCode.UNKNOWN_ERROR, str(e)
            )

    def _success_response(self, request_id: str, data: Any) -> Dict[str, Any]:
        """Create a success response."""
        response = Response(
            id=str(uuid.uuid4()),
            timestamp=time.time(),
            type="response",
            request_id=request_id,
            success=True,
            data=data,
        )
        return response.to_dict()

    def _error_response(
        self, request_id: str, code: str, message: str, details: Optional[Any] = None
    ) -> Dict[str, Any]:
        """Create an error response."""
        error = {"code": code, "message": message}
        if details is not None:
            error["details"] = details

        response = Response(
            id=str(uuid.uuid4()),
            timestamp=time.time(),
            type="response",
            request_id=request_id,
            success=False,
            error=error,
        )
        return response.to_dict()

    def handle_get_variables(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_variables request."""
        request_id = message.get("id", "unknown")
        params = message.get("params", {})

        # Get filter parameters
        filter_params = params.get("filter", {})
        types_filter = filter_params.get("types", [])
        pattern = filter_params.get("pattern")
        exclude_private = filter_params.get("exclude_private", True)
        _max_preview_size = filter_params.get(
            "max_preview_size", 100
        )  # TODO: implement preview size limit

        # Get sort parameters
        sort_params = params.get("sort", {})
        sort_by = sort_params.get("by", "name")
        sort_order = sort_params.get("order", "asc")

        # Get all variables
        namespace = self.kernel.get_namespace()
        variables = []

        for name, value in namespace.items():
            # Apply filters
            if exclude_private and name.startswith("_"):
                continue

            if pattern:
                import re

                if not re.search(pattern, name):
                    continue

            # Get variable info
            var_info = self.kernel.get_variable_info(name)
            if var_info:
                if types_filter and var_info.type not in types_filter:
                    continue
                variables.append(var_info.to_dict())

        # Sort variables
        if sort_by == "name":
            variables.sort(key=lambda x: x["name"])
        elif sort_by == "type":
            variables.sort(key=lambda x: x["type"])
        elif sort_by == "size":
            variables.sort(key=lambda x: x.get("size", 0) or 0)

        if sort_order == "desc":
            variables.reverse()

        return self._success_response(
            request_id,
            {
                "variables": variables,
                "total_count": len(namespace),
                "filtered_count": len(variables),
            },
        )

    def handle_inspect_variable(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle inspect_variable request."""
        request_id = message.get("id", "unknown")
        params = message.get("params", {})

        var_name = params.get("name")
        if not var_name:
            return self._error_response(
                request_id, ErrorCode.INVALID_REQUEST, "Variable name is required"
            )

        deep = params.get("deep", False)
        include_methods = params.get("include_methods", False)
        _include_source = params.get(
            "include_source", False
        )  # TODO: implement source code display

        # Get variable info
        var_info = self.kernel.get_variable_info(var_name, deep=deep)
        if not var_info:
            return self._error_response(
                request_id,
                ErrorCode.VARIABLE_NOT_FOUND,
                f"Variable '{var_name}' not found",
            )

        # Convert to detailed format
        info_dict = var_info.to_dict()

        # Add additional details if requested
        namespace = self.kernel.get_namespace()
        if var_name in namespace:
            value = namespace[var_name]

            # Add repr and str
            try:
                info_dict["repr"] = repr(value)
                info_dict["str"] = str(value)
            except Exception:
                pass

            # Add docstring
            try:
                if hasattr(value, "__doc__") and value.__doc__:
                    info_dict["doc"] = value.__doc__
            except Exception:
                pass

            # Add methods if requested
            if include_methods and var_info.is_callable:
                try:
                    methods = []
                    for attr in dir(value):
                        if not attr.startswith("_") and callable(
                            getattr(value, attr, None)
                        ):
                            methods.append({"name": attr, "type": "method"})
                    info_dict["methods"] = methods[:20]  # Limit to prevent overwhelming
                except Exception:
                    pass

        return self._success_response(request_id, {"name": var_name, "info": info_dict})

    def handle_execute_code(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle execute_code request."""
        request_id = message.get("id", "unknown")
        params = message.get("params", {})

        code = params.get("code")
        if not code:
            return self._error_response(
                request_id, ErrorCode.INVALID_REQUEST, "Code is required"
            )

        _mode = params.get("mode", "exec")  # TODO: implement different execution modes
        _capture_output = params.get(
            "capture_output", True
        )  # TODO: implement output capture control
        silent = params.get("silent", False)
        _store_result = params.get(
            "store_result", True
        )  # TODO: implement result storage control
        _timeout = params.get("timeout")  # TODO: implement execution timeout

        # Execute code
        result = self.kernel.execute_code(code, silent=silent, store_history=not silent)

        # Store in history
        self.execution_history.append(
            {"timestamp": time.time(), "code": code, "result": result.to_dict()}
        )

        # Return appropriate response
        if result.success:
            return self._success_response(request_id, result.to_dict())
        else:
            return self._error_response(
                request_id,
                ErrorCode.EXECUTION_ERROR,
                result.error.get("message", "Execution failed")
                if result.error
                else "Unknown error",
                result.error,
            )

    def handle_get_kernel_info(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_kernel_info request."""
        request_id = message.get("id", "unknown")

        info = self.kernel.get_kernel_info()
        info.update(
            {
                "kernel_id": str(uuid.uuid4()),  # Mock ID
                "protocol_version": "5.3",
                "status": "idle" if self.kernel.is_available else "not_connected",
                "execution_count": self.kernel.shell.execution_count
                if self.kernel.is_available and self.kernel.shell
                else 0,
                "start_time": time.time(),  # Mock
                "last_activity": time.time(),
                "connections": 1,
            }
        )

        return self._success_response(request_id, info)

    def handle_get_stack_trace(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_stack_trace request."""
        request_id = message.get("id", "unknown")
        params = message.get("params", {})

        include_locals = params.get("include_locals", False)
        _include_source = params.get(
            "include_source", False
        )  # TODO: implement source code in stack trace
        max_frames = params.get("max_frames", 10)

        # Get stack trace
        frames = self.kernel.get_stack_trace(
            include_locals=include_locals, max_frames=max_frames
        )

        # Get last error if any
        last_error = self.kernel.get_last_error()

        return self._success_response(
            request_id,
            {
                "frames": [f.to_dict() for f in frames],
                "exception": last_error,
                "is_active": last_error is not None,
            },
        )

    def handle_get_history(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_history request."""
        request_id = message.get("id", "unknown")
        params = message.get("params", {})

        n_items = params.get("n_items", 10)
        _session_only = params.get(
            "session_only", True
        )  # TODO: implement session-based history filtering
        include_output = params.get("include_output", True)
        search = params.get("search")

        # Get history from our execution history
        history = self.execution_history[-n_items:]

        # Apply search filter if provided
        if search:
            history = [
                h for h in history if search.lower() in h.get("code", "").lower()
            ]

        # Format history items
        items = []
        for h in history:
            result = h.get("result", {})
            item = {
                "execution_count": result.get("execution_count", 0),
                "timestamp": h.get("timestamp", 0),
                "input": h.get("code", ""),
                "success": result.get("success", False),
            }

            if include_output:
                item["output"] = result.get("outputs", [])

            items.append(item)

        return self._success_response(
            request_id, {"items": items, "total_count": len(self.execution_history)}
        )
