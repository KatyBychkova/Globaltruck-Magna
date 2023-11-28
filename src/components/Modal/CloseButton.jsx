function CloseButton({ onClose, children }) {
    return (
        <button
            onClick={() => {
                onClose();
            }}
        >
            {children}
        </button>
    );
}

export default CloseButton;
