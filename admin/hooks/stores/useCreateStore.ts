import { getEmptyStoreObject } from "@/utils";
import useUpdateProps from "../useUpdateProps";
import useMutateCreateStore from "./useMutateCreateStore";
import { useModal } from "@/contexts/modal";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useFeedback } from "@/contexts/feedback";

const DEFAULT_STORE = getEmptyStoreObject();

export default function useCreateStore() {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending } = useMutateCreateStore();

    const { state: store, updateProps } = useUpdateProps(DEFAULT_STORE);

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

            setFeedback({
                type: 'success',
                message: 'Store has been created',
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

    return {
        store,
        updateProps,
        createStore,
        isPending,
    }
}