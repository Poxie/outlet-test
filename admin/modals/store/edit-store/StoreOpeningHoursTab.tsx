import { Store } from "@/utils/types";
import StoreOpeningHours from "../StoreOpeningHours";
import useUpdateStore from "@/hooks/stores/useUpdateStore";
import ModalFooter from "@/modals/ModalFooter";

export default function StoreOpeningHoursTab({ store }: {
    store: Store;
}) {
    const { currentStore, updateProps, updateStore, isPending } = useUpdateStore(store);

    return(
        <form onSubmit={updateStore}>
            <StoreOpeningHours 
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