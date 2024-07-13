import { Store } from "@/utils/types";
import StoreContactInformation from "../StoreContactInformation";
import ModalFooter from "@/modals/ModalFooter";
import useUpdateStore from "@/hooks/stores/useUpdateStore";

export default function StoreContactTab({ store }: {
    store: Store;
}) {
    const { currentStore, updateProps, updateStore, isPending } = useUpdateStore(store);

    return(
        <form onSubmit={updateStore}>
            <StoreContactInformation 
                store={currentStore}
                updateProps={updateProps}
                className="p-4"
            />
            <ModalFooter 
                confirmText="Save changes"
                confirmLoadingText="Saving changes..."
                loading={isPending}
            />
        </form>
    )
}