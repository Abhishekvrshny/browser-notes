// Toolbar Component with view mode buttons
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
    onToggleViewMode,
    onToggleMobileMenu
}) => {
    const handleViewModeSelect = (mode) => {
        if (mode === 'hide') {
            if (showPreview) onTogglePreview();
        } else if (mode === 'split') {
            if (!showPreview) onTogglePreview();
            if (viewMode !== 'split') onToggleViewMode();
        } else if (mode === 'full') {
            if (!showPreview) onTogglePreview();
            if (viewMode !== 'preview-only') onToggleViewMode();
        }
    };

    const isActive = (mode) => {
        if (mode === 'hide') return !showPreview;
        if (mode === 'split') return showPreview && viewMode === 'split';
        if (mode === 'full') return showPreview && viewMode === 'preview-only';
        return false;
    };

    return React.createElement('div', {
        className: 'toolbar-mobile p-3 flex items-center justify-between',
        style: {
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-primary)'
        }
    }, [
        React.createElement('div', {
            key: 'left',
            className: 'toolbar-left flex items-center gap-3'
        }, [
            // Mobile hamburger menu
            React.createElement('button', {
                key: 'mobile-menu',
                onClick: onToggleMobileMenu,
                className: 'mobile-menu-button',
                title: 'Toggle sidebar'
            }, React.createElement('svg', {
                className: 'w-5 h-5',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M4 6h16M4 12h16M4 18h16'
            }))),

            // View mode buttons
            React.createElement('div', {
                key: 'view-buttons',
                className: 'flex items-center gap-1',
                style: {
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }
            }, [
                React.createElement('button', {
                    key: 'hide-button',
                    onClick: () => handleViewModeSelect('hide'),
                    className: 'px-3 py-1 text-sm transition-colors',
                    style: {
                        background: isActive('hide') ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        borderRight: '1px solid var(--border)'
                    },
                    title: 'Hide preview'
                }, 'Hide'),
                React.createElement('button', {
                    key: 'split-button',
                    onClick: () => handleViewModeSelect('split'),
                    className: 'px-3 py-1 text-sm transition-colors',
                    style: {
                        background: isActive('split') ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        borderRight: '1px solid var(--border)'
                    },
                    title: 'Split view'
                }, 'Split'),
                React.createElement('button', {
                    key: 'full-button',
                    onClick: () => handleViewModeSelect('full'),
                    className: 'px-3 py-1 text-sm transition-colors',
                    style: {
                        background: isActive('full') ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: 'none'
                    },
                    title: 'Full preview'
                }, 'Full')
            ]),
            
            React.createElement('button', {
                key: 'theme',
                onClick: onToggleTheme,
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                }
            }, [
                theme === 'light' ? 
                    React.createElement('svg', {
                        key: 'icon',
                        className: 'w-4 h-4',
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24'
                    }, React.createElement('path', {
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 2,
                        d: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                    })) :
                    React.createElement('svg', {
                        key: 'icon',
                        className: 'w-4 h-4',
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24'
                    }, React.createElement('path', {
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 2,
                        d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                    })),
                React.createElement('span', { key: 'text' }, theme === 'light' ? 'Dark' : 'Light')
            ]),

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
            className: 'toolbar-right flex items-center gap-3'
        }, [
            showPreview && viewMode === 'split' && React.createElement('span', {
                key: 'shortcut-hint',
                className: 'text-xs hide-mobile',
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
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1 hide-mobile',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                },
                title: 'Export note'
            }, [
                React.createElement('svg', {
                    key: 'icon',
                    className: 'w-4 h-4',
                    fill: 'none',
                    stroke: 'currentColor',
                    viewBox: '0 0 24 24'
                }, React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    d: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                })),
                React.createElement('span', { key: 'text' }, 'Export')
            ]),

            React.createElement('button', {
                key: 'import',
                onClick: onImport,
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1 hide-mobile',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                },
                title: 'Import note'
            }, [
                React.createElement('svg', {
                    key: 'icon',
                    className: 'w-4 h-4',
                    fill: 'none',
                    stroke: 'currentColor',
                    viewBox: '0 0 24 24'
                }, React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                    d: 'M12 14l-3-3m0 0l3-3m-3 3h12M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z'
                })),
                React.createElement('span', { key: 'text' }, 'Import')
            ]),

            React.createElement('a', {
                key: 'github-link',
                href: 'https://github.com/Abhishekvrshny/browser-notes',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors hide-mobile',
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
