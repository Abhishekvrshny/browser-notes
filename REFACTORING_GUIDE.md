# Jotdown - Refactoring Guide

## Overview

This project has been refactored from a monolithic structure to a modular architecture for better maintainability, scalability, and code organization.

## New Project Structure

```
jotdown/
├── css/
│   ├── main.css                    # Main CSS file that imports all modules
│   ├── themes/
│   │   └── variables.css           # CSS variables and theme definitions
│   └── components/
│       ├── base.css                # Reset styles and base typography
│       ├── markdown.css            # Markdown preview styling
│       ├── layout.css              # Layout and responsive design
│       ├── ui-elements.css         # Buttons, inputs, dropdowns, etc.
│       └── scrollbar.css           # Custom scrollbar styling
├── js/
│   ├── main.js                     # Main application entry point
│   ├── services/
│   │   ├── storage.js              # LocalStorage utilities
│   │   ├── markdown.js             # Markdown parsing and configuration
│   │   └── textUtils.js            # Text processing utilities
│   ├── components/
│   │   ├── ContextMenu.js          # Context menu component
│   │   ├── Sidebar.js              # Sidebar with tabs component
│   │   ├── Editor.js               # Editor component with view modes
│   │   └── Toolbar.js              # Toolbar component
│   └── constants/
│       └── content.js              # Welcome content and constants
├── index-modular.html              # New modular HTML entry point
└── [legacy files...]               # Original monolithic files
```

## Benefits of the New Structure

### 1. **Separation of Concerns**
- **Services**: Handle data operations and business logic
- **Components**: Focused UI components with single responsibilities
- **Themes**: Centralized styling and theming
- **Constants**: Application constants and content

### 2. **Improved Maintainability**
- Each file has a single, clear purpose
- Easier to locate and modify specific functionality
- Reduced risk of unintended side effects when making changes

### 3. **Better Code Organization**
- Related functionality is grouped together
- Clear dependency relationships
- Easier onboarding for new developers

### 4. **Enhanced Scalability**
- Easy to add new components or services
- Modular CSS allows for theme extensions
- Component reusability across different parts of the app

## File Descriptions

### CSS Modules

#### `css/themes/variables.css`
- CSS custom properties for light and dark themes
- Color schemes, spacing, and design tokens
- Media query support for system theme preferences

#### `css/components/base.css`
- CSS reset and normalization
- Base typography and body styles
- Accessibility features (focus outlines, reduced motion)

#### `css/components/markdown.css`
- Comprehensive markdown preview styling
- Syntax highlighting for code blocks
- Table, list, and blockquote styling
- Task list checkbox styling

#### `css/components/layout.css`
- Flexbox layouts for editor and preview panes
- Responsive design breakpoints
- Sidebar and main content area layouts
- View mode specific styling (split, full preview, editor-only)

#### `css/components/ui-elements.css`
- Button, input, and form element styling
- Dropdown menus and context menus
- Tab styling and interactions
- Custom checkbox and range input styling

#### `css/components/scrollbar.css`
- Custom scrollbar styling for webkit and Firefox
- Performance optimizations for large content
- Smooth scrolling behaviors

### JavaScript Modules

#### `js/services/storage.js`
- LocalStorage wrapper with error handling
- JSON serialization/deserialization
- Simple get/set interface

#### `js/services/markdown.js`
- Marked.js configuration for GitHub-flavored markdown
- DOMPurify integration for security
- Task list rendering support
- Custom renderer for enhanced features

#### `js/services/textUtils.js`
- Title extraction from markdown content
- Word count calculation
- Text processing utilities

#### `js/constants/content.js`
- Welcome message content
- Help documentation
- Application constants

#### `js/components/ContextMenu.js`
- Right-click context menu component
- Click-outside handling
- Configurable menu items with separators

#### `js/components/Sidebar.js`
- Tab management and navigation
- Inline tab editing
- Collapsible sidebar functionality
- Tab creation and deletion

#### `js/components/Editor.js`
- Multi-mode editor (editor-only, split, preview-only)
- Keyboard shortcuts (Ctrl+Shift+P)
- Textarea with markdown editing
- View mode switching

#### `js/components/Toolbar.js`
- View mode dropdown
- Theme switching
- Font size controls
- Export/import functionality
- Word count display

#### `js/main.js`
- Main application component
- State management with React hooks
- Event handlers and business logic
- Component composition and rendering

## Migration from Legacy Structure

### Original Structure Issues
1. **Large monolithic files**: `js/components.js` (300+ lines), `css/styles.css` (1000+ lines)
2. **Mixed concerns**: UI components, utilities, and styling all mixed together
3. **Difficult maintenance**: Hard to find specific functionality
4. **Poor scalability**: Adding new features required modifying large files

### Migration Benefits
1. **Reduced file sizes**: Each module is focused and manageable (50-150 lines)
2. **Clear dependencies**: Easy to understand what each module does
3. **Easier testing**: Individual modules can be tested in isolation
4. **Better collaboration**: Multiple developers can work on different modules

## Usage

### Development
Use the modular version for development:
```html
<!-- Load index-modular.html -->
<link rel="stylesheet" href="css/main.css">
<script src="js/main.js"></script>
```

### Production
The build system can still compile everything into the original structure for production if needed.

## Best Practices

### Adding New Components
1. Create a new file in `js/components/`
2. Export the component to `window` object
3. Import in `js/main.js`
4. Add corresponding CSS in `css/components/`

### Adding New Services
1. Create a new file in `js/services/`
2. Export functions to `window` object
3. Import in `js/main.js` or relevant components

### Styling Guidelines
1. Use CSS custom properties from `variables.css`
2. Follow the existing naming conventions
3. Add component-specific styles to appropriate CSS modules
4. Maintain responsive design principles

## Future Improvements

1. **ES6 Modules**: Convert to proper ES6 import/export syntax
2. **TypeScript**: Add type safety with TypeScript
3. **Build System**: Implement proper bundling with Webpack/Vite
4. **Testing**: Add unit tests for individual modules
5. **Documentation**: Add JSDoc comments to all functions
6. **Performance**: Implement code splitting and lazy loading

## Compatibility

The modular version maintains full compatibility with the original functionality while providing a much cleaner and more maintainable codebase.
