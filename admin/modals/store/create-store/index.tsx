import ModalHeader from "@/modals/ModalHeader";
import StoreDetails from "../StoreDetails";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import StoreContactInformation from "../StoreContactInformation";
import StoreOpeningHours from "../StoreOpeningHours";
import StoreInternalInformation from "../StoreInternalInformation";
import ModalFooter from "@/modals/ModalFooter";
import useCreateStore from "@/hooks/stores/useCreateStore";

export default function CreateStoreModal() {
    const { store, updateProps, createStore, isPending } = useCreateStore();

    return(
        <>
        <ModalHeader 
            title="Add store"
        />

        <form onSubmit={createStore}>
            <StoreDetails 
                store={store}
                updateProps={updateProps}
                className="p-4"
            />
            <ModalSectionHeader>
                Contact information
            </ModalSectionHeader>
            <StoreContactInformation 
                store={store}
                updateProps={updateProps}
                className="p-4"
            />
            <ModalSectionHeader>
                Store opening hours
            </ModalSectionHeader>
            <StoreOpeningHours 
                store={store}
                updateProps={updateProps}
                className="p-4"
            />
            <ModalSectionHeader>
                Store internal notes
            </ModalSectionHeader>
            <StoreInternalInformation 
                className="p-4"
                storeNumber={store.id}
                updateProps={updateProps}
                canEditStoreNumber
            />

            <ModalFooter 
                confirmText="Add store"
                confirmLoadingText="Adding store..."
                loading={isPending}
            />
        </form>
        </>
    )
}