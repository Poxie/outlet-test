import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";

export default function ConfirmModal({ onConfirm, onCancel, title, message, loading, cancelText, confirmText, confirmLoadingText }: {
    onConfirm: () => void;
    onCancel?: () => void;
    title: string;
    message: string;
    loading?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirmLoadingText?: string;
}) {
    return(
        <>
        <ModalHeader 
            title={title}
            description={message}
        />
        <ModalFooter 
            closeOnCancel
            onConfirm={onConfirm}
            loading={loading}
            onCancel={onCancel}
            cancelText={cancelText}
            confirmText={confirmText}
            confirmLoadingText={confirmLoadingText}
        />
        </>
    )
}