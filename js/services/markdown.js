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

// Initialize markdown configuration when script loads
configureMarkdown();

// Export for use in other modules
window.parseMarkdown = parseMarkdown;
window.configureMarkdown = configureMarkdown;
