"""Pytest-based test runner for all widget tests."""

import os
import subprocess
import sys


def run_pytest_tests() -> bool:
    """Run all tests using pytest."""
    print("Assistant-UI Widget Test Suite (pytest)")
    print("=" * 50)

    # Change to the project root directory
    project_root = os.path.dirname(os.path.dirname(__file__))  # noqa: PTH120
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
        result = subprocess.run(cmd, capture_output=False, text=True, check=False)
    except Exception as e:  # noqa: BLE001
        print(f"Error running pytest: {e}")
        return False
    else:
        return result.returncode == 0


def main() -> int:
    """Main test runner."""
    success = run_pytest_tests()

    if success:
        print("\n🎉 All tests passed!")
        return 0
    print("\n❌ Some tests failed")
    return 1


if __name__ == "__main__":
    sys.exit(main())
