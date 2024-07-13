import ModalHeader from "@/modals/ModalHeader";
import StoreDetails from "../StoreDetails";
import { getEmptyStoreObject } from "@/utils";
import useUpdateProps from "@/hooks/useUpdateProps";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import StoreContactInformation from "../StoreContactInformation";
import StoreOpeningHours from "../StoreOpeningHours";
import StoreInternalInformation from "../StoreInternalInformation";
import ModalFooter from "@/modals/ModalFooter";
import useCreateStore from "@/hooks/stores/useCreateStore";
import useFeedback from "@/hooks/useFeedback";
import { useModal } from "@/contexts/modal";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

const DEFAULT_STORE = getEmptyStoreObject();
export default function CreateStoreModal() {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();

    const { mutateAsync, isPending } = useCreateStore();

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: store, updateProps } = useUpdateProps(DEFAULT_STORE, {
        onUpdate: clearFeedback,
    });

    const createStore = async (e: React.FormEvent) => {
        e.preventDefault();

        // Turn id into storeNumber prop & remove createdAt
        const { id, createdAt, ...rest } = store;
        const storeData = {
            storeNumber: id,
            ...rest,
        }
        
        try {
            await mutateAsync(storeData);

            refetchQuery(['stores']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: "danger",
            });
        }
    }

    return(
        <>
        <ModalHeader 
            title="Add store"
        />

        <form onSubmit={createStore}>
            <div className="p-4">
                <StoreDetails 
                    store={store}
                    updateProps={updateProps}
                />
            </div>
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
            <div className="p-4">
                <StoreInternalInformation 
                    storeNumber={store.id}
                    updateProps={updateProps}
                    canEditStoreNumber
                />
            </div>

            <ModalFooter 
                confirmText="Add store"
                confirmLoadingText="Adding store..."
                loading={isPending}
            />
        </form>
        </>
    )
}