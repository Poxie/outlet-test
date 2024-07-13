import { Store } from "@/utils/types";
import StoreDetails from "../StoreDetails";
import useUpdateStore from "@/hooks/stores/useUpdateStore";
import ModalFooter from "@/modals/ModalFooter";

export default function StoreDetailsTab({ store, isAdmin }: {
    store: Store;
    isAdmin: boolean;
}) {
    const { currentStore, updateProps, updateStore, isPending } = useUpdateStore(store);

    return(
        <form onSubmit={updateStore}>
            <StoreDetails 
                className="p-4"
                store={currentStore}
                updateProps={updateProps}
                withStoreNumber
            />

            {isAdmin && (
                <ModalFooter 
                    confirmText="Save changes"
                    confirmLoadingText="Saving changes..."
                    loading={isPending}
                />
            )}
        </form>
    )
}