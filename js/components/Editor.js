// Editor Component with new view modes
const Editor = ({ content, onChange, fontSize, showPreview, viewMode, onToggleViewMode }) => {
    const { useEffect } = React;

    // Keyboard shortcut handler
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'P') {
                event.preventDefault();
                if (showPreview) {
                    onToggleViewMode();
                }
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onToggleViewMode, showPreview]);

    if (!showPreview) {
        // Editor only mode
        return React.createElement('div', {
            className: 'editor-only'
        }, React.createElement('div', {
            className: 'editor-container'
        }, React.createElement('textarea', {
            value: content,
            onChange: (e) => onChange(e.target.value),
            className: 'editor-textarea',
            style: { fontSize: `${fontSize}px` },
            placeholder: 'Start typing your markdown here...'
        })));
    }

    if (viewMode === 'preview-only') {
        // Preview only mode
        return React.createElement('div', {
            className: 'full-preview'
        }, [
            // Full-width preview
            React.createElement('div', {
                key: 'preview',
                className: 'preview-container'
            }, React.createElement('div', {
                className: 'markdown-preview',
                dangerouslySetInnerHTML: { __html: parseMarkdown(content) }
            }))
        ]);
    }

    // Split view mode (default)
    return React.createElement('div', {
        className: 'split-view'
    }, [
        // Editor pane
        React.createElement('div', {
            key: 'editor',
            className: 'editor-pane'
        }, React.createElement('div', {
            key: 'editor-container',
            className: 'editor-container'
        }, React.createElement('textarea', {
            value: content,
            onChange: (e) => onChange(e.target.value),
            className: 'editor-textarea',
            style: { fontSize: `${fontSize}px` },
            placeholder: 'Start typing your markdown here...'
        }))),

        // Preview pane
        React.createElement('div', {
            key: 'preview',
            className: 'preview-pane'
        }, React.createElement('div', {
            key: 'preview-content',
            className: 'preview-container'
        }, React.createElement('div', {
            className: 'markdown-preview',
            dangerouslySetInnerHTML: { __html: parseMarkdown(content) }
        })))
    ]);
};

// Export for use in other modules
window.Editor = Editor;
