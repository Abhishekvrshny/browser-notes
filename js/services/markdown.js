// Configure marked for GitHub-flavored markdown with task lists
const configureMarkdown = () => {
    if (typeof marked !== 'undefined') {
        // Set up marked with proper options
        marked.setOptions({ 
            gfm: true, 
            breaks: true, 
            headerIds: true, 
            mangle: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        
        const renderer = new marked.Renderer();
        
        // Custom list item renderer for task lists
        const originalListItem = renderer.listitem;
        renderer.listitem = function(text, task, checked) {
            if (task) {
                // Remove existing HTML input checkbox elements that marked already added
                let cleanText = text;
                cleanText = cleanText.replace(/<input[^>]*type="checkbox"[^>]*>/gi, '');
                cleanText = cleanText.replace(/^\s+/, ''); // trim leading whitespace
                
                const checkbox = checked ? 
                    '<input type="checkbox" checked disabled class="task-list-item-checkbox">' : 
                    '<input type="checkbox" disabled class="task-list-item-checkbox">';
                return `<li class="task-list-item">${checkbox} ${cleanText}</li>\n`;
            }
            return originalListItem.call(this, text, task, checked);
        };
        
        // Custom list renderer to ensure proper list styling
        const originalList = renderer.list;
        renderer.list = function(body, ordered, start) {
            const type = ordered ? 'ol' : 'ul';
            const startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
            return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
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
