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
                className: 'p-1 rounded text-xs',
                style: {
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)'
                },
                title: collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }, collapsed ? '📂' : '📁')
        ]),

        // New Tab Button
        React.createElement('div', {
            key: 'new-tab',
            className: 'p-3'
        }, React.createElement('button', {
            onClick: onNewTab,
            className: `w-full p-2 rounded text-sm font-medium transition-colors ${collapsed ? 'px-2' : ''}`,
            style: {
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)'
            }
        }, collapsed ? '📝' : [
            React.createElement('span', { key: 'icon' }, '📝'),
            React.createElement('span', { key: 'text' }, ' New Note')
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
                        className: 'tab-actions'
                    }, [
                        React.createElement('button', {
                            key: 'edit',
                            onClick: (e) => handleEditStart(tab, e),
                            className: 'edit-btn',
                            title: 'Edit name'
                        }, '✎'),
                        tabs.length > 1 && React.createElement('button', {
                            key: 'delete',
                            onClick: (e) => handleDeleteClick(tab.id, e),
                            className: 'delete-btn',
                            title: 'Delete note'
                        }, '×')
                    ])
                ])
            ])
        ))
    ]);
};

// Export for use in other modules
window.Sidebar = Sidebar;
