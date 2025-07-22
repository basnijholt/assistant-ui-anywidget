# Frontend Structure Documentation

This directory contains the TypeScript/React implementation of the Assistant UI anywidget.

## Module Structure

### Core Widget

- **`src/index.tsx`** - Main widget component that integrates with anywidget
  - Exports the widget using `createRender` from `@anywidget/react`
  - Contains the `ChatWidget` component with full chat functionality
  - Handles state synchronization with Python backend via `useModelState` and `useModel`

### Testing

- **`src/test/setup.ts`** - Test environment setup with mocked dependencies
- **`src/test/basic.test.ts`** - Basic unit tests for widget functionality
- **`vitest.config.ts`** - Vitest test runner configuration

### Build Configuration

- **`vite.config.ts`** - Main build configuration
  - Builds the widget as a single ES module (`dist/index.js`)
  - Bundles all dependencies including React
  - Optimized for integration with Python anywidget

### Demo & Screenshots

- **`demo.html`** - Standalone HTML demo page with inline React widget
  - Simple, self-contained demo that doesn't require the full anywidget stack
  - Used for visual testing and screenshots
- **`scripts/serve-demo.cjs`** - Simple HTTP server for the demo page
- **`scripts/screenshot.cjs`** - Puppeteer script for automated screenshots

## How It Works

1. **In Jupyter**: The Python `AgentWidget` class loads `dist/index.js` and the widget communicates with Python via the anywidget protocol

2. **For Screenshots**: The `demo.html` file contains a simplified version that renders the same UI without requiring Jupyter or Python

## Development

```bash
# Install dependencies
npm install

# Build the widget
npm run build

# Run tests
npm test

# Start demo server for screenshots
npm run demo

# Take screenshots
npm run screenshot
```

## Screenshot System

The screenshot system allows viewing the widget without Jupyter:

1. Run `npm run demo` to start a simple server
2. Run `npm run screenshot` to capture the widget
3. Screenshots are saved in `screenshots/`

This is useful for:

- Visual regression testing
- Documentation
- Sharing the widget appearance without running Jupyter
