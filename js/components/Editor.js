// Editor Component with synchronized scrolling and font size support
const Editor = ({ content, onChange, fontSize, showPreview, viewMode, onToggleViewMode }) => {
    const { useEffect, useRef } = React;
    
    // Refs for synchronized scrolling
    const editorRef = useRef(null);
    const previewRef = useRef(null);
    const isScrollingSyncRef = useRef(false);

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

    // Synchronized scrolling handlers
    const handleEditorScroll = () => {
        if (isScrollingSyncRef.current || !previewRef.current || !editorRef.current) return;
        
        isScrollingSyncRef.current = true;
        
        const editor = editorRef.current;
        const preview = previewRef.current;
        
        // Calculate scroll percentage
        const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        const targetScrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
        
        preview.scrollTop = targetScrollTop;
        
        setTimeout(() => {
            isScrollingSyncRef.current = false;
        }, 50);
    };

    const handlePreviewScroll = () => {
        if (isScrollingSyncRef.current || !previewRef.current || !editorRef.current) return;
        
        isScrollingSyncRef.current = true;
        
        const editor = editorRef.current;
        const preview = previewRef.current;
        
        // Calculate scroll percentage
        const scrollPercentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        const targetScrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight);
        
        editor.scrollTop = targetScrollTop;
        
        setTimeout(() => {
            isScrollingSyncRef.current = false;
        }, 50);
    };

    if (!showPreview) {
        // Editor only mode
        return React.createElement('div', {
            className: 'editor-only'
        }, React.createElement('div', {
            className: 'editor-container'
        }, React.createElement('textarea', {
            ref: editorRef,
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
                ref: previewRef,
                className: 'preview-container'
            }, React.createElement('div', {
                className: 'markdown-preview',
                style: { fontSize: `${fontSize}px` },
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
            ref: editorRef,
            value: content,
            onChange: (e) => onChange(e.target.value),
            onScroll: handleEditorScroll,
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
            ref: previewRef,
            onScroll: handlePreviewScroll,
            className: 'preview-container'
        }, React.createElement('div', {
            className: 'markdown-preview',
            style: { fontSize: `${fontSize}px` },
            dangerouslySetInnerHTML: { __html: parseMarkdown(content) }
        })))
    ]);
};

// Export for use in other modules
window.Editor = Editor;
