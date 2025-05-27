// Storage utilities
const storage = {
    get: (key) => { 
        try { 
            return JSON.parse(localStorage.getItem(key)); 
        } catch { 
            return null; 
        } 
    },
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

// Configure marked for GitHub-flavored markdown with task lists
const configureMarkdown = () => {
    if (typeof marked !== 'undefined') {
        marked.setOptions({ gfm: true, breaks: true, headerIds: true, mangle: false });
        
        const renderer = new marked.Renderer();
        const originalListItem = renderer.listitem;
        
        renderer.listitem = function(text, task, checked) {
            if (task) {
                const checkbox = checked ? 
                    '<input type="checkbox" checked disabled class="task-list-item-checkbox">' : 
                    '<input type="checkbox" disabled class="task-list-item-checkbox">';
                return `<li class="task-list-item">${checkbox} ${text}</li>\n`;
            }
            return originalListItem.call(this, text, task, checked);
        };
        
        marked.setOptions({ renderer });
    }
};

// Parse markdown text to HTML
const parseMarkdown = (text) => {
    if (!text) return '';
    try {
        const html = marked.parse(text);
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'u', 's', 'del', 'a', 'img', 'code', 'pre', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'hr', 'div', 'span', 'input'],
            ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class', 'id', 'align', 'type', 'checked', 'disabled']
        });
    } catch (error) {
        return text.replace(/\n/g, '<br>');
    }
};

// Extract title from markdown text
const extractTitle = (text) => {
    if (!text) return 'Untitled';
    const firstLine = text.split('\n')[0].trim();
    if (firstLine.startsWith('#')) return firstLine.replace(/^#+\s*/, '');
    return firstLine.substring(0, 50) || 'Untitled';
};

// Get word count from text
const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Welcome content for new users
const getWelcomeContent = () => `# Welcome to Browser Notes

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

// Initialize markdown configuration when script loads
configureMarkdown();
