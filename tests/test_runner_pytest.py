#!/usr/bin/env python3
"""
Pytest-based test runner for all widget tests.
"""

import sys
import subprocess
import os


def run_pytest_tests():
    """Run all tests using pytest."""
    print("Assistant-UI Widget Test Suite (pytest)")
    print("=" * 50)

    # Change to the project root directory
    project_root = os.path.dirname(os.path.dirname(__file__))
    os.chdir(project_root)

    # Run pytest with verbose output
    cmd = [
        sys.executable,
        "-m",
        "pytest",
        "tests/",
        "-v",
        "--tb=short",
        "--disable-warnings",
    ]

    try:
        result = subprocess.run(cmd, capture_output=False, text=True)
        return result.returncode == 0
    except Exception as e:
        print(f"Error running pytest: {e}")
        return False


def main():
    """Main test runner."""
    success = run_pytest_tests()

    if success:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print("\n❌ Some tests failed")
        return 1


if __name__ == "__main__":
    sys.exit(main())
