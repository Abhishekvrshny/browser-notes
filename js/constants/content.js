// Welcome content for new users
const getWelcomeContent = () => `# Welcome to Jotdown

This is a powerful browser-based note-taking application with full markdown support!

## Features
- **Enhanced Markdown Support**: Full GitHub-flavored markdown
- **Task Lists**: Interactive checkboxes ✅
- **Live Preview**: Toggle between edit and preview modes
- **Multiple Notes**: Create and organize notes in tabs
- **Auto-save**: Notes are saved automatically
- **Themes**: Switch between light and dark themes
- **Export/Import**: Backup and restore your notes

## View Modes 🆕
- **Editor Only**: Focus on writing without distractions
- **Split View**: Edit and preview side by side (default)
- **Preview Only**: Full-width preview for reading (NEW!)

### How to Use View Modes
1. Click the "Preview" button to enable split view
2. Use **Ctrl+Shift+P** to toggle between split and preview-only modes
3. Click the expand buttons (⋮⋮ or ⤢) in the editor/preview panes
4. Click "◀ Editor" button in preview-only mode to return to split view

## Markdown Examples

### Text Formatting
- **Bold text** using \`**bold**\`
- *Italic text* using \`*italic*\`
- \`Inline code\` using backticks
- ~~Strikethrough~~ using \`~~text~~\`

### Task Lists / Checkboxes
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

### Code Blocks
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### Tables
| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Full support |
| Dark Mode | ✅ | Toggle available |
| Export | ✅ | JSON format |
| View Modes | ✅ | NEW! |

### Links and Images
[Visit GitHub](https://github.com)

### Blockquotes
> This is a blockquote. It can contain multiple lines
> and will be styled appropriately.

---

## Getting Started
1. Click the "+" button to create a new note
2. Start typing in markdown format
3. Use the preview toggle to see rendered output
4. Try the new view modes with **Ctrl+Shift+P**
5. Your notes are automatically saved

Happy note-taking! 📝`;

// Export for use in other modules
window.getWelcomeContent = getWelcomeContent;
