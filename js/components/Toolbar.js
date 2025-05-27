// Toolbar Component with view mode dropdown
const Toolbar = ({ 
    showPreview, 
    onTogglePreview, 
    theme, 
    onToggleTheme, 
    fontSize, 
    onFontSizeChange, 
    wordCount,
    onExport,
    onImport,
    viewMode,
    onToggleViewMode
}) => {
    const { useState, useRef, useEffect } = React;
    const [showViewDropdown, setShowViewDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowViewDropdown(false);
            }
        };
        
        if (showViewDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showViewDropdown]);

    const handleViewModeSelect = (mode) => {
        if (mode === 'hide') {
            onTogglePreview();
        } else if (mode === 'split') {
            if (!showPreview) onTogglePreview();
            if (viewMode !== 'split') onToggleViewMode();
        } else if (mode === 'full') {
            if (!showPreview) onTogglePreview();
            if (viewMode !== 'preview-only') onToggleViewMode();
        }
        setShowViewDropdown(false);
    };

    const getCurrentViewText = () => {
        if (!showPreview) return 'Hide';
        return viewMode === 'preview-only' ? 'Full View' : 'Split View';
    };

    return React.createElement('div', {
        className: 'p-3 flex items-center justify-between',
        style: {
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-primary)'
        }
    }, [
        React.createElement('div', {
            key: 'left',
            className: 'flex items-center gap-3'
        }, [
            // View mode dropdown
            React.createElement('div', {
                key: 'view-dropdown',
                ref: dropdownRef,
                className: 'relative'
            }, [
                React.createElement('button', {
                    key: 'dropdown-button',
                    onClick: () => setShowViewDropdown(!showViewDropdown),
                    className: 'px-3 py-1 rounded text-sm flex items-center gap-1',
                    style: {
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                    },
                    title: 'View options'
                }, [
                    React.createElement('span', { key: 'icon' }, '👁️'),
                    React.createElement('span', { key: 'text' }, getCurrentViewText()),
                    React.createElement('span', { key: 'arrow' }, ' ▼')
                ]),
                
                showViewDropdown && React.createElement('div', {
                    key: 'dropdown-menu',
                    className: 'absolute top-full left-0 mt-1 py-1 rounded shadow-lg z-50',
                    style: {
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        minWidth: '120px'
                    }
                }, [
                    React.createElement('button', {
                        key: 'hide-option',
                        onClick: () => handleViewModeSelect('hide'),
                        className: 'w-full px-3 py-2 text-left text-sm hover:bg-opacity-10 transition-colors',
                        style: {
                            background: !showPreview ? 'var(--bg-hover)' : 'transparent',
                            color: 'var(--text-primary)'
                        }
                    }, 'Hide Preview'),
                    React.createElement('button', {
                        key: 'split-option',
                        onClick: () => handleViewModeSelect('split'),
                        className: 'w-full px-3 py-2 text-left text-sm hover:bg-opacity-10 transition-colors',
                        style: {
                            background: (showPreview && viewMode === 'split') ? 'var(--bg-hover)' : 'transparent',
                            color: 'var(--text-primary)'
                        }
                    }, 'Split View'),
                    React.createElement('button', {
                        key: 'full-option',
                        onClick: () => handleViewModeSelect('full'),
                        className: 'w-full px-3 py-2 text-left text-sm hover:bg-opacity-10 transition-colors',
                        style: {
                            background: (showPreview && viewMode === 'preview-only') ? 'var(--bg-hover)' : 'transparent',
                            color: 'var(--text-primary)'
                        }
                    }, 'Full View')
                ])
            ]),
            
            React.createElement('button', {
                key: 'theme',
                onClick: onToggleTheme,
                className: 'px-3 py-1 rounded text-sm',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                }
            }, theme === 'light' ? '🌙 Dark' : '☀️ Light'),

            React.createElement('div', {
                key: 'font-size',
                className: 'flex items-center gap-2'
            }, [
                React.createElement('label', {
                    key: 'label',
                    className: 'text-sm',
                    style: { color: 'var(--text-secondary)' }
                }, 'Font:'),
                React.createElement('button', {
                    key: 'decrease',
                    onClick: () => onFontSizeChange(Math.max(12, fontSize - 1)),
                    className: 'px-2 py-1 rounded text-xs',
                    style: {
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                    },
                    disabled: fontSize <= 12,
                    title: 'Decrease font size'
                }, '−'),
                React.createElement('span', {
                    key: 'value',
                    className: 'text-sm w-8 text-center',
                    style: { color: 'var(--text-secondary)' }
                }, `${fontSize}px`),
                React.createElement('button', {
                    key: 'increase',
                    onClick: () => onFontSizeChange(Math.min(20, fontSize + 1)),
                    className: 'px-2 py-1 rounded text-xs',
                    style: {
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                    },
                    disabled: fontSize >= 20,
                    title: 'Increase font size'
                }, '+')
            ])
        ]),

        React.createElement('div', {
            key: 'right',
            className: 'flex items-center gap-3'
        }, [
            showPreview && viewMode === 'split' && React.createElement('span', {
                key: 'shortcut-hint',
                className: 'text-xs',
                style: { color: 'var(--text-muted)' }
            }, 'Ctrl+Shift+P'),

            React.createElement('span', {
                key: 'word-count',
                className: 'text-sm',
                style: { color: 'var(--text-secondary)' }
            }, `${wordCount} words`),

            React.createElement('button', {
                key: 'export',
                onClick: onExport,
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                },
                title: 'Export note'
            }, [
                React.createElement('span', { key: 'icon' }, '📤'),
                React.createElement('span', { key: 'text' }, 'Export')
            ]),

            React.createElement('button', {
                key: 'import',
                onClick: onImport,
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                },
                title: 'Import note'
            }, [
                React.createElement('span', { key: 'icon' }, '📥'),
                React.createElement('span', { key: 'text' }, 'Import')
            ]),

            React.createElement('a', {
                key: 'github-link',
                href: 'https://github.com/Abhishekvrshny/browser-notes',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none'
                },
                title: 'View on GitHub'
            }, [
                React.createElement('svg', {
                    key: 'github-icon',
                    width: '16',
                    height: '16',
                    viewBox: '0 0 24 24',
                    fill: 'currentColor',
                    style: { flexShrink: 0 }
                }, React.createElement('path', {
                    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                })),
                React.createElement('span', { key: 'text' }, 'GitHub')
            ])
        ])
    ]);
};

// Export for use in other modules
window.Toolbar = Toolbar;
