// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel' }) => {
    const { useEffect, useRef } = React;
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the dialog when it opens
            dialogRef.current?.focus();
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    onCancel();
                } else if (event.key === 'Enter') {
                    onConfirm();
                }
            };
            
            document.addEventListener('keydown', handleKeyDown);
            
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
            };
        }
    }, [isOpen, onConfirm, onCancel]);

    if (!isOpen) return null;

    return React.createElement('div', {
        className: 'confirm-dialog-overlay',
        onClick: onCancel
    }, [
        React.createElement('div', {
            key: 'dialog',
            ref: dialogRef,
            className: 'confirm-dialog',
            onClick: (e) => e.stopPropagation(),
            tabIndex: -1
        }, [
            React.createElement('div', {
                key: 'header',
                className: 'confirm-dialog-header'
            }, React.createElement('h3', {
                className: 'confirm-dialog-title'
            }, title)),
            
            React.createElement('div', {
                key: 'body',
                className: 'confirm-dialog-body'
            }, React.createElement('p', {
                className: 'confirm-dialog-message'
            }, message)),
            
            React.createElement('div', {
                key: 'footer',
                className: 'confirm-dialog-footer'
            }, [
                React.createElement('button', {
                    key: 'cancel',
                    onClick: onCancel,
                    className: 'confirm-dialog-button cancel'
                }, cancelText),
                React.createElement('button', {
                    key: 'confirm',
                    onClick: onConfirm,
                    className: 'confirm-dialog-button confirm'
                }, confirmText)
            ])
        ])
    ]);
};

// Export for use in other modules
window.ConfirmDialog = ConfirmDialog;
