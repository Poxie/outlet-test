import Button from "@/components/button";
import { useModal } from "@/contexts/modal";

export default function ModalFooter({ 
    closeOnCancel, onCancel, onConfirm, loading, 
    cancelText='Cancel', confirmText='Confirm',
    confirmLoadingText='Confirming...',
}: {
    closeOnCancel?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmLoadingText?: string;
    loading?: boolean;
}) {
    const { closeModal } = useModal();

    return(
        <div className="p-4 flex justify-end items-center gap-2 bg-secondary rounded-b-md">
            <Button 
                className="p-3 text-sm hover:bg-tertiary active:bg-quaternary"
                type="transparent"
                onClick={() => {
                    if(closeOnCancel) {
                        closeModal();
                    }
                    onCancel?.();
                }}
                disabled={loading}
            >
                {cancelText}
            </Button>
            <Button 
                onClick={onConfirm}
                disabled={loading}
                className="p-3 font-medium text-sm"
                buttonType="submit"
            >
                {!loading ? confirmText : confirmLoadingText}
            </Button>
        </div>
    )
}