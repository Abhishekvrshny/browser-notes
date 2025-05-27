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
        }, [
            React.createElement('div', {
                key: 'editor-container',
                className: 'editor-container'
            }, React.createElement('textarea', {
                value: content,
                onChange: (e) => onChange(e.target.value),
                className: 'editor-textarea',
                style: { fontSize: `${fontSize}px` },
                placeholder: 'Start typing your markdown here...'
            })),
            
            // Expand to preview-only button
            React.createElement('button', {
                key: 'expand-btn',
                onClick: onToggleViewMode,
                className: 'absolute top-4 right-4 px-2 py-1 rounded text-xs shadow-sm transition-colors',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)'
                },
                title: 'Expand preview (Ctrl+Shift+P)'
            }, '⋮⋮')
        ]),

        // Preview pane
        React.createElement('div', {
            key: 'preview',
            className: 'preview-pane'
        }, [
            React.createElement('div', {
                key: 'preview-content',
                className: 'preview-container'
            }, React.createElement('div', {
                className: 'markdown-preview',
                dangerouslySetInnerHTML: { __html: parseMarkdown(content) }
            })),
            
            // Expand to preview-only button
            React.createElement('button', {
                key: 'expand-preview-btn',
                onClick: onToggleViewMode,
                className: 'absolute top-4 right-4 px-2 py-1 rounded text-xs shadow-sm transition-colors',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)'
                },
                title: 'Expand preview (Ctrl+Shift+P)'
            }, '⤢')
        ])
    ]);
};

// Export for use in other modules
window.Editor = Editor;
