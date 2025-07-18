#!/usr/bin/env python3
"""Automatic test for the widget using nbconvert."""

import os
import sys
import tempfile
import subprocess
import json

# Add the python directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python'))

def create_test_notebook():
    """Create a test notebook that uses the widget."""
    notebook = {
        "cells": [
            {
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [
                    "import sys\n",
                    "import os\n",
                    "sys.path.insert(0, os.path.join(os.getcwd(), 'python'))\n",
                    "from agent_widget import AgentWidget"
                ]
            },
            {
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Create and test the widget\n",
                    "print('Creating widget...')\n",
                    "widget = AgentWidget()\n",
                    "print(f'Widget created: {widget.__class__.__name__}')\n",
                    "print(f'Widget model_id: {widget.model_id}')\n",
                    "print(f'ESM path exists: {os.path.exists(widget._esm) if isinstance(widget._esm, str) and not widget._esm.startswith(\"var\") else \"bundled\"}') \n",
                    "print('Widget test complete!')"
                ]
            },
            {
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Display the widget\n",
                    "widget"
                ]
            }
        ],
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {
                    "name": "ipython",
                    "version": 3
                },
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.8.0"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }
    return notebook

def run_automatic_test():
    """Run an automatic test of the widget."""
    print("=== Automatic Widget Test ===")
    
    # Test 1: Widget creation
    print("\n1. Testing widget creation...")
    try:
        from agent_widget import AgentWidget
        widget = AgentWidget()
        print(f"   ✓ Widget created: {widget.__class__.__name__}")
        print(f"   ✓ Widget ID: {widget.model_id}")
        print(f"   ✓ ESM type: {'bundled JS' if widget._esm.startswith('var') else 'file path'}")
    except Exception as e:
        print(f"   ✗ Widget creation failed: {e}")
        return False
    
    # Test 2: Check built JS file
    print("\n2. Testing built JavaScript...")
    frontend_js = os.path.join(os.path.dirname(__file__), 'frontend', 'dist', 'index.js')
    if os.path.exists(frontend_js):
        with open(frontend_js, 'r') as f:
            content = f.read()
        
        # Check if React is bundled (not imported)
        if content.startswith('var') and 'React' in content and 'import' not in content[:100]:
            print("   ✓ JavaScript bundle exists and contains React")
        else:
            print("   ✗ JavaScript bundle may have import issues")
            return False
    else:
        print(f"   ✗ JavaScript bundle not found at {frontend_js}")
        return False
    
    # Test 3: Create and run test notebook
    print("\n3. Testing notebook execution...")
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.ipynb', delete=False) as f:
            json.dump(create_test_notebook(), f)
            notebook_path = f.name
        
        # Execute notebook
        result = subprocess.run([
            sys.executable, '-m', 'jupyter', 'nbconvert', 
            '--to', 'notebook', 
            '--execute', 
            '--output', notebook_path.replace('.ipynb', '_executed.ipynb'),
            notebook_path
        ], capture_output=True, text=True, cwd=os.path.dirname(__file__))
        
        if result.returncode == 0:
            print("   ✓ Notebook executed successfully")
        else:
            print(f"   ✗ Notebook execution failed: {result.stderr}")
            return False
            
        # Clean up
        os.unlink(notebook_path)
        executed_path = notebook_path.replace('.ipynb', '_executed.ipynb')
        if os.path.exists(executed_path):
            os.unlink(executed_path)
            
    except Exception as e:
        print(f"   ✗ Notebook test failed: {e}")
        return False
    
    print("\n=== All tests passed! ===")
    print("\nThe widget should now work in Jupyter notebooks.")
    print("To test manually:")
    print("1. Run: uv run jupyter notebook")
    print("2. Create a new notebook")
    print("3. Run the test code from the notebook")
    
    return True

if __name__ == "__main__":
    success = run_automatic_test()
    sys.exit(0 if success else 1)