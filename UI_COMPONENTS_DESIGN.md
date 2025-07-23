# UI Components Design

## Overview

This document outlines the UI/UX design for the AI Assistant Widget, focusing on component structure, user interactions, and visual design patterns.

## Design Principles

1. **Clarity**: Information should be immediately understandable
2. **Efficiency**: Common tasks should require minimal clicks
3. **Context**: Show relevant information based on current task
4. **Responsiveness**: Smooth interactions and real-time updates
5. **Accessibility**: WCAG 2.1 AA compliant

## Component Architecture

```
AssistantWidget
├── Header
│   ├── StatusIndicator
│   ├── ModelSelector
│   └── SettingsMenu
├── MainContent
│   ├── ChatPanel
│   │   ├── MessageList
│   │   ├── InputArea
│   │   └── ActionButtons
│   ├── SidePanel (Collapsible)
│   │   ├── VariableExplorer
│   │   ├── HistoryViewer
│   │   └── DebugPanel
│   └── CodePreview (Modal/Overlay)
└── Footer
    ├── QuickActions
    └── ResourceMonitor
```

## Detailed Component Specifications

### 1. Header Component

```typescript
interface HeaderProps {
  kernelStatus: KernelStatus;
  aiModel: string;
  onModelChange: (model: string) => void;
  onSettingsClick: () => void;
}
```

**Visual Design:**

- Height: 48px
- Background: Gradient from #f8f9fa to #ffffff
- Border-bottom: 1px solid #e0e0e0

**Features:**

- Kernel status indicator (green/yellow/red dot)
- AI model dropdown selector
- Settings gear icon
- Minimize/maximize button

### 2. Chat Panel

#### Message List

```typescript
interface MessageListProps {
  messages: Message[];
  onCodeClick: (code: string) => void;
  onVariableClick: (varName: string) => void;
  onRetry: (messageId: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  status?: "sending" | "sent" | "error";
  metadata?: {
    executionTime?: number;
    tokensUsed?: number;
    model?: string;
  };
}
```

**Message Rendering:**

- User messages: Right-aligned, blue background (#007bff)
- Assistant messages: Left-aligned, white background
- System messages: Center-aligned, gray background
- Code blocks: Syntax highlighted with copy button
- Variable mentions: Clickable, underlined, tooltip on hover

#### Input Area

```typescript
interface InputAreaProps {
  onSubmit: (message: string) => void;
  onExecuteCode: (code: string) => void;
  suggestions?: string[];
  isProcessing: boolean;
}
```

**Features:**

- Multi-line textarea with auto-resize
- Markdown preview toggle
- Code mode toggle (switches to monospace font)
- Autocomplete for variable names (triggered by `@`)
- File attachment support (future)
- Voice input button (future)

**Keyboard Shortcuts:**

- `Ctrl/Cmd + Enter`: Send message
- `Ctrl/Cmd + K`: Toggle code mode
- `Ctrl/Cmd + /`: Show shortcuts
- `Tab`: Accept autocomplete suggestion

### 3. Variable Explorer

```typescript
interface VariableExplorerProps {
  variables: Variable[];
  onInspect: (variable: Variable) => void;
  onExecute: (code: string) => void;
  filter: VariableFilter;
  onFilterChange: (filter: VariableFilter) => void;
}

interface Variable {
  name: string;
  type: string;
  value: any;
  size?: number;
  shape?: number[];
  preview?: string;
  isExpanded?: boolean;
}
```

**Layout:**

```
┌─────────────────────────────────┐
│ 🔍 Search variables...          │
├─────────────────────────────────┤
│ Filter: All ▼  Sort: Name ▼    │
├─────────────────────────────────┤
│ 📊 df          DataFrame        │
│    (1000, 5)  2.3 MB           │
├─────────────────────────────────┤
│ 🔢 x           int              │
│    42                          │
├─────────────────────────────────┤
│ 📝 text        str              │
│    "Hello world..."            │
└─────────────────────────────────┘
```

**Features:**

- Search with regex support
- Type-based filtering
- Sort by name/type/size/modified
- Inline preview for simple types
- Expand for detailed view
- Context menu (inspect, plot, delete)

### 4. Code Preview Modal

```typescript
interface CodePreviewProps {
  code: string;
  language: string;
  onExecute: () => void;
  onEdit: (newCode: string) => void;
  onClose: () => void;
  executionResult?: ExecutionResult;
}
```

**Features:**

- Syntax-highlighted code editor
- Line numbers
- Execute button with loading state
- Output panel (collapsible)
- Edit mode with diff view
- Copy entire code block

### 5. Debug Panel

```typescript
interface DebugPanelProps {
  error?: ErrorInfo;
  stackTrace?: StackFrame[];
  suggestions?: DebugSuggestion[];
  onExecuteSuggestion: (code: string) => void;
}
```

**Layout:**

```
┌─────────────────────────────────┐
│ ⚠️ NameError                    │
│ name 'xyz' is not defined       │
├─────────────────────────────────┤
│ Stack Trace:                    │
│ > module.py:42 in function()    │
│   cell_123:5 in <module>        │
├─────────────────────────────────┤
│ 💡 Suggestions:                 │
│ • Check variable name           │
│ • Did you mean 'xy'?           │
│ • Import missing module         │
└─────────────────────────────────┘
```

### 6. Action Buttons

```typescript
interface ActionButtonsProps {
  buttons: ActionButton[];
  onAction: (action: string) => void;
}

interface ActionButton {
  id: string;
  text: string;
  icon?: string;
  color?: string;
  tooltip?: string;
  shortcut?: string;
}
```

**Common Actions:**

- 🔄 Retry last execution
- 🧹 Clear variables
- 📊 Show data summary
- 🐛 Debug mode toggle
- 📝 Export conversation

## Interaction Patterns

### 1. Drag and Drop

- Variables can be dragged from explorer to chat input
- Code blocks can be dragged to create new cells
- Files can be dragged to upload (future)

### 2. Context Menus

Right-click on:

- Variables: Inspect, Plot, Delete, Copy name
- Code blocks: Execute, Edit, Copy, Create cell
- Messages: Copy, Retry, Delete

### 3. Tooltips

Show on hover for:

- Variables: Type, size, preview
- Truncated text: Full content
- Buttons: Keyboard shortcuts
- Status indicators: Detailed status

### 4. Progressive Disclosure

- Collapsed sections expand on click
- "Show more" for long outputs
- Accordion pattern for nested data
- Lazy loading for large lists

## Visual Design System

### Color Palette

```css
:root {
  /* Primary */
  --primary-blue: #007bff;
  --primary-hover: #0056b3;

  /* Status */
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;

  /* Grays */
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
  --gray-400: #ced4da;
  --gray-500: #adb5bd;
  --gray-600: #6c757d;
  --gray-700: #495057;
  --gray-800: #343a40;
  --gray-900: #212529;

  /* Semantic */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --border-color: var(--gray-300);
  --bg-primary: #ffffff;
  --bg-secondary: var(--gray-100);
}
```

### Typography

```css
.heading-large {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.body-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}

.code-text {
  font-family: "SF Mono", "Monaco", "Inconsolata", monospace;
  font-size: 13px;
}

.small-text {
  font-size: 12px;
  color: var(--text-secondary);
}
```

### Spacing System

```css
/* 4px base unit */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

### Animation Patterns

```css
/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease;
}

/* Hover effects */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Loading states */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.loading {
  animation: pulse 1.5s infinite;
}
```

## Responsive Design

### Breakpoints

```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

### Mobile Adaptations

- Side panel becomes bottom sheet
- Simplified variable explorer
- Touch-friendly tap targets (min 44px)
- Swipe gestures for panel navigation

## Accessibility Features

### Keyboard Navigation

- Tab order follows visual hierarchy
- Focus indicators clearly visible
- All actions keyboard accessible
- Escape key closes modals

### Screen Reader Support

- Semantic HTML structure
- ARIA labels for icons
- Live regions for updates
- Descriptive button text

### Visual Accessibility

- High contrast mode support
- Customizable font size
- Color-blind friendly palette
- Reduced motion option

## State Management

```typescript
interface UIState {
  // Layout
  sidePanelOpen: boolean;
  sidePanelTab: "variables" | "history" | "debug";

  // Chat
  inputMode: "text" | "code";
  isProcessing: boolean;

  // Modals
  codePreview: {
    open: boolean;
    code: string;
    language: string;
  };

  // Preferences
  theme: "light" | "dark";
  fontSize: "small" | "medium" | "large";
  showLineNumbers: boolean;
  autoScroll: boolean;
}
```

## Performance Optimizations

### Virtualization

- Virtual scrolling for long message lists
- Lazy rendering of variable explorer items
- On-demand syntax highlighting

### Debouncing

- Search input (300ms)
- Window resize (100ms)
- Scroll events (50ms)

### Caching

- Parsed markdown content
- Syntax highlighted code
- Variable previews

## Future Enhancements

### Version 2.0

- Dark mode theme
- Custom keyboard shortcuts
- Plugin system for extensions
- Collaborative features

### Version 3.0

- Voice interaction
- AR/VR visualization
- Advanced data visualization
- Multi-language support

## Implementation Guidelines

### Component Structure

```typescript
// Example component template
export const VariableExplorer: React.FC<VariableExplorerProps> = ({
  variables,
  onInspect,
  filter,
  onFilterChange
}) => {
  // Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Computed values
  const filteredVariables = useMemo(() => {
    return filterVariables(variables, filter, debouncedSearch);
  }, [variables, filter, debouncedSearch]);

  // Event handlers
  const handleInspect = useCallback((variable: Variable) => {
    trackEvent('variable_inspected', { type: variable.type });
    onInspect(variable);
  }, [onInspect]);

  // Render
  return (
    <div className="variable-explorer">
      {/* Component JSX */}
    </div>
  );
};
```

### Testing Strategy

- Unit tests for all components
- Integration tests for workflows
- Visual regression tests
- Accessibility audits
- Performance benchmarks

## Conclusion

This UI design provides a comprehensive, intuitive interface for the AI assistant widget. The modular component structure allows for incremental development while maintaining consistency and usability.
