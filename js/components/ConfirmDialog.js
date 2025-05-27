// Confirmation Dialog Component using Daisy UI
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel' }) => {
    const { useEffect, useRef } = React;
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the dialog when it opens
            dialogRef.current?.focus();
            
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
            };
        }
    }, [isOpen, onConfirm, onCancel]);

    if (!isOpen) return null;

    return React.createElement('div', {
        className: 'modal modal-open'
    }, [
        React.createElement('div', {
            key: 'modal-box',
            ref: dialogRef,
            className: 'modal-box',
            tabIndex: -1
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'font-bold text-lg mb-4'
            }, title),
            
            React.createElement('p', {
                key: 'message',
                className: 'py-4'
            }, message),
            
            React.createElement('div', {
                key: 'actions',
                className: 'modal-action'
            }, [
                React.createElement('button', {
                    key: 'cancel',
                    onClick: onCancel,
                    className: 'btn btn-ghost'
                }, cancelText),
                React.createElement('button', {
                    key: 'confirm',
                    onClick: onConfirm,
                    className: 'btn btn-error'
                }, confirmText)
            ])
        ]),
        React.createElement('div', {
            key: 'backdrop',
            className: 'modal-backdrop',
            onClick: onCancel
        })
    ]);
};

// Export for use in other modules
window.ConfirmDialog = ConfirmDialog;
