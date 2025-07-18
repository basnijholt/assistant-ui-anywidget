#!/usr/bin/env python3
"""
Test summary script to show pytest test results.
"""

import subprocess
import sys
import os


def run_pytest_summary():
    """Run pytest with summary output."""
    print("🧪 Assistant-UI Widget Test Suite Summary")
    print("=" * 50)

    # Change to the project root directory
    project_root = os.path.dirname(os.path.dirname(__file__))
    os.chdir(project_root)

    # Run pytest with summary
    cmd = [
        sys.executable,
        "-m",
        "pytest",
        "tests/test_widget_basic.py",
        "tests/test_chat_synchronization_pytest.py",
        "--tb=short",
        "-q",
        "--disable-warnings",
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    print("Test Results:")
    print(result.stdout)

    if result.stderr:
        print("Errors:")
        print(result.stderr)

    return result.returncode == 0


if __name__ == "__main__":
    success = run_pytest_summary()

    if success:
        print("\n✅ All pytest tests passed!")
        print("\nTo run tests yourself:")
        print("  uv run pytest                    # Run all tests")
        print("  uv run pytest -v                 # Verbose output")
        print("  uv run pytest --cov=python       # With coverage")
    else:
        print("\n❌ Some tests failed")

    sys.exit(0 if success else 1)
