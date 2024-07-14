import { Store } from "@/utils/types";
import ConfirmModal from "../confirm";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import useMutateDeleteStore from "@/hooks/stores/useMutateDeleteStore";
import { useFeedback } from "@/contexts/feedback";

export default function DeleteStoreModal({ store }: {
    store: Store;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateDeleteStore(store.id);

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const deleteStore = async () => {
        try {
            await mutateAsync();

            setFeedback({
                type: 'success',
                message: 'Store has been deleted',
            })

            refetchQuery(['stores']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    const title = `Remove ${store.name}`;
    const message = "Are you sure you want to delete this store? This action cannot be undone.";
    return(
        <ConfirmModal 
            title={title}
            message={message}
            onConfirm={deleteStore}
            confirmText="Delete store"
            confirmLoadingText="Deleting store..."
            loading={isPending}
        />
    )
}