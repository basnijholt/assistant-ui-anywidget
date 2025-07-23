"""Simplified message handlers for kernel interaction."""

import time
from typing import Any, Dict, List, Optional

from .kernel_interface import KernelInterface


class SimpleHandlers:
    """Simple message handlers for kernel interaction."""

    def __init__(self, kernel_interface: Optional[KernelInterface] = None):
        """Initialize handlers."""
        self.kernel = kernel_interface or KernelInterface()
        self.execution_history: List[Dict[str, Any]] = []

    def handle_message(self, message: Any) -> Dict[str, Any]:
        """Route message to appropriate handler."""
        # Handle non-dict messages
        if not isinstance(message, dict):
            return {"success": False, "error": "Message type is required"}

        msg_type = message.get("type")
        if not msg_type:
            return {"success": False, "error": "Message type is required"}

        # Route to handler methods
        if msg_type == "get_variables":
            return self._handle_get_variables(message)
        elif msg_type == "inspect_variable":
            return self._handle_inspect_variable(message)
        elif msg_type == "execute_code":
            return self._handle_execute_code(message)
        elif msg_type == "get_kernel_info":
            return self._handle_get_kernel_info(message)
        elif msg_type == "get_stack_trace":
            return self._handle_get_stack_trace(message)
        elif msg_type == "get_history":
            return self._handle_get_history(message)
        else:
            return {"success": False, "error": f"Unknown message type: {msg_type}"}

    def _handle_get_variables(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_variables request."""
        if not self.kernel.is_available:
            return {"success": False, "error": "Kernel is not available"}

        params = message.get("params", {})
        filter_params = params.get("filter", {})
        sort_params = params.get("sort", {})

        # Get filter parameters
        types_filter = filter_params.get("types", [])
        pattern = filter_params.get("pattern")
        exclude_private = filter_params.get("exclude_private", True)

        # Get sort parameters
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

        return {
            "success": True,
            "data": {
                "variables": variables,
                "total_count": len(variables),
                "timestamp": time.time(),
            },
        }

    def _handle_inspect_variable(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle inspect_variable request."""
        if not self.kernel.is_available:
            return {"success": False, "error": "Kernel is not available"}

        params = message.get("params", {})
        var_name = params.get("name")

        if not var_name:
            return {"success": False, "error": "Variable name is required"}

        # Get variable info
        deep = params.get("deep", False)
        var_info = self.kernel.get_variable_info(var_name, deep=deep)

        if not var_info:
            return {"success": False, "error": f"Variable '{var_name}' not found"}

        return {"success": True, "data": var_info.to_dict()}

    def _handle_execute_code(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle execute_code request."""
        if not self.kernel.is_available:
            return {"success": False, "error": "Kernel is not available"}

        params = message.get("params", {})
        code = params.get("code")

        if not code:
            return {"success": False, "error": "Code is required"}

        # Execute code
        silent = params.get("silent", False)
        store_history = params.get("store_history", True)

        result = self.kernel.execute_code(
            code, silent=silent, store_history=store_history
        )

        # Store in execution history
        if store_history:
            self.execution_history.append(
                {
                    "input": code,
                    "timestamp": time.time(),
                    "result": result.to_dict(),
                }
            )

        if result.success:
            return {"success": True, "data": result.to_dict()}
        else:
            error_msg = (
                result.error.get("message", "Execution failed")
                if result.error
                else "Execution failed"
            )
            return {"success": False, "error": error_msg, "details": result.to_dict()}

    def _handle_get_kernel_info(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_kernel_info request."""
        return {"success": True, "data": self.kernel.get_kernel_info()}

    def _handle_get_stack_trace(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_stack_trace request."""
        if not self.kernel.is_available:
            return {"success": False, "error": "Kernel is not available"}

        params = message.get("params", {})
        max_depth = params.get("max_depth", 10)

        # Get last error from kernel
        last_error = self.kernel.get_last_error()
        if not last_error:
            return {
                "success": True,
                "data": {"stack_trace": None, "message": "No recent error"},
            }

        # Limit traceback depth
        traceback = last_error.get("traceback", [])
        if max_depth and len(traceback) > max_depth:
            traceback = traceback[:max_depth]

        return {
            "success": True,
            "data": {
                "stack_trace": traceback,
                "error_type": last_error.get("type"),
                "message": last_error.get("message"),
            },
        }

    def _handle_get_history(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get_history request."""
        params = message.get("params", {})
        limit = params.get("limit", 50)
        search = params.get("search")

        history = self.execution_history

        # Apply search filter
        if search:
            history = [
                item for item in history if search.lower() in item["input"].lower()
            ]

        # Apply limit
        if limit:
            history = history[-limit:]

        return {
            "success": True,
            "data": {
                "items": history,
                "total_count": len(self.execution_history),
                "filtered_count": len(history),
            },
        }
