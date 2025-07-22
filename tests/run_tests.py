#!/usr/bin/env python3
"""Test runner for all widget tests."""

import subprocess
import sys
from pathlib import Path


def run_test(test_file: str) -> bool:
    """Run a single test file."""
    test_path = Path(__file__).parent / test_file
    print(f"\n{'=' * 50}")
    print(f"Running {test_file}")
    print(f"{'=' * 50}")

    try:
        result = subprocess.run(
            [sys.executable, test_path],
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent,
            check=False,
        )

        if result.returncode == 0:
            print(f"✓ {test_file} PASSED")
            if result.stdout:
                print(result.stdout)
        else:
            print(f"✗ {test_file} FAILED")
            if result.stderr:
                print("STDERR:", result.stderr)
            if result.stdout:
                print("STDOUT:", result.stdout)

    except Exception as e:  # noqa: BLE001
        print(f"✗ {test_file} ERROR: {e}")
        return False
    else:
        return result.returncode == 0


def main() -> int:
    """Run all tests."""
    print("Assistant-UI Widget Test Suite")
    print("=" * 50)

    tests = [
        "test_widget.py",
        "test_widget_simple.py",
        "test_widget_comprehensive.py",
        "test_chat_synchronization.py",
    ]

    results = []
    for test in tests:
        success = run_test(test)
        results.append((test, success))

    print(f"\n{'=' * 50}")
    print("TEST SUMMARY")
    print(f"{'=' * 50}")

    passed = sum(1 for _, success in results if success)
    total = len(results)

    for test, success in results:
        status = "✓ PASS" if success else "✗ FAIL"
        print(f"{status} {test}")

    print(f"\nResults: {passed}/{total} tests passed")

    if passed == total:
        print("\n🎉 All tests passed!")
        return 0
    print(f"\n❌ {total - passed} tests failed")
    return 1


if __name__ == "__main__":
    sys.exit(main())
