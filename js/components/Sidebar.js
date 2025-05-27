// Sidebar Component
const Sidebar = ({ tabs, activeTab, onTabSelect, onNewTab, onDeleteTab, onEditTab, collapsed, onToggleCollapse }) => {
    const { useState } = React;
    const [editingTab, setEditingTab] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleEditStart = (tab, event) => {
        event.stopPropagation();
        setEditingTab(tab.id);
        setEditTitle(tab.title);
    };

    const handleEditSave = (tabId, event) => {
        event.stopPropagation();
        if (editTitle.trim()) {
            onEditTab(tabId, editTitle.trim());
        }
        setEditingTab(null);
        setEditTitle('');
    };

    const handleEditCancel = (event) => {
        event.stopPropagation();
        setEditingTab(null);
        setEditTitle('');
    };

    const handleDeleteClick = (tabId, event) => {
        event.stopPropagation();
        if (tabs.length > 1) {
            onDeleteTab(tabId);
        }
    };

    return React.createElement('div', {
        className: `sidebar-container transition-all duration-300 ${collapsed ? 'w-12' : 'w-48'}`,
        style: {
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border)'
        }
    }, [
        // Header
        React.createElement('div', {
            key: 'header',
            className: 'p-3 flex items-center justify-between',
            style: { borderBottom: '1px solid var(--border)' }
        }, [
            !collapsed && React.createElement('h2', {
                key: 'title',
                className: 'text-sm font-semibold',
                style: { color: 'var(--text-primary)' }
            }, 'Notes'),
            React.createElement('button', {
                key: 'toggle',
                onClick: onToggleCollapse,
                className: 'p-1 rounded text-xs flex items-center justify-center',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)'
                },
                title: collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }, React.createElement('svg', {
                className: 'w-4 h-4',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'
            })))
        ]),

        // New Tab Button
        React.createElement('div', {
            key: 'new-tab',
            className: 'p-3'
        }, React.createElement('button', {
            onClick: onNewTab,
            className: `btn btn-primary btn-sm w-full ${collapsed ? 'btn-square' : 'justify-start'}`,
        }, collapsed ? 
            React.createElement('svg', {
                className: 'w-4 h-4',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M12 4v16m8-8H4'
            })) : [
            React.createElement('svg', {
                key: 'icon',
                className: 'w-4 h-4 mr-2',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            }, React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M12 4v16m8-8H4'
            })),
            React.createElement('span', { key: 'text' }, 'New Note')
        ])),

        // Tabs List
        React.createElement('div', {
            key: 'tabs',
            className: 'sidebar-tabs'
        }, tabs.map(tab => 
            React.createElement('div', {
                key: tab.id,
                className: `tab-compact cursor-pointer transition-colors ${activeTab === tab.id ? 'bg-opacity-20' : ''}`,
                style: {
                    backgroundColor: activeTab === tab.id ? 'var(--bg-hover)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                    opacity: activeTab === tab.id ? 0.9 : 1
                },
                onClick: () => onTabSelect(tab.id)
            }, [
                React.createElement('div', {
                    key: 'content',
                    className: 'tab-content'
                }, [
                    React.createElement('div', {
                        key: 'info',
                        className: 'tab-info'
                    }, [
                        editingTab === tab.id ? 
                            React.createElement('input', {
                                key: 'edit-input',
                                type: 'text',
                                value: editTitle,
                                onChange: (e) => setEditTitle(e.target.value),
                                onKeyDown: (e) => {
                                    if (e.key === 'Enter') handleEditSave(tab.id, e);
                                    if (e.key === 'Escape') handleEditCancel(e);
                                },
                                onBlur: (e) => handleEditSave(tab.id, e),
                                autoFocus: true,
                                className: 'tab-title w-full bg-transparent border-none outline-none',
                                style: {
                                    color: 'var(--text-primary)',
                                    fontSize: '0.75rem',
                                    padding: 0
                                }
                            }) :
                            React.createElement('div', {
                                key: 'title',
                                className: 'tab-title truncate',
                                style: { color: 'var(--text-primary)' }
                            }, collapsed ? tab.title.charAt(0).toUpperCase() : tab.title),
                        !collapsed && !editingTab && React.createElement('div', {
                            key: 'date',
                            className: 'tab-date',
                            style: { color: 'var(--text-muted)' }
                        }, new Date(tab.createdAt).toLocaleDateString())
                    ]),
                    !collapsed && React.createElement('div', {
                        key: 'actions',
                        className: 'tab-actions flex gap-1'
                    }, [
                        React.createElement('button', {
                            key: 'edit',
                            onClick: (e) => handleEditStart(tab, e),
                            className: 'btn btn-ghost btn-xs',
                            title: 'Edit name'
                        }, React.createElement('svg', {
                            className: 'w-3 h-3',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        }, React.createElement('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        }))),
                        tabs.length > 1 && React.createElement('button', {
                            key: 'delete',
                            onClick: (e) => handleDeleteClick(tab.id, e),
                            className: 'btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content',
                            title: 'Delete note'
                        }, React.createElement('svg', {
                            className: 'w-3 h-3',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        }, React.createElement('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M6 18L18 6M6 6l12 12'
                        })))
                    ])
                ])
            ])
        ))
    ]);
};

// Export for use in other modules
window.Sidebar = Sidebar;
