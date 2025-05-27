// Context Menu Component
const ContextMenu = ({ x, y, items, onClose }) => {
    const { useRef, useEffect } = React;
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return React.createElement('div', {
        ref: menuRef,
        className: 'context-menu',
        style: { left: x, top: y }
    }, items.map((item, index) => 
        item.separator ? 
            React.createElement('div', { key: index, className: 'context-menu-separator' }) :
            React.createElement('div', {
                key: index,
                className: 'context-menu-item',
                onClick: () => { item.onClick(); onClose(); }
            }, item.label)
    ));
};

// Export for use in other modules
window.ContextMenu = ContextMenu;
