import { Store } from "@/utils/types";
import ConfirmModal from "../confirm";
import useDeleteStore from "@/hooks/stores/useDeleteStore";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";

export default function DeleteStoreModal({ store }: {
    store: Store;
}) {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();

    const { mutateAsync, isPending } = useDeleteStore(store.id);

    const deleteStore = async () => {
        await mutateAsync();
        refetchQuery(['stores']);
        closeModal();
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