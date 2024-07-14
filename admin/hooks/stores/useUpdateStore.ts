import { Store } from "@/utils/types";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useRefetchQuery from "../react-query/useRefetchQuery";
import useMutateUpdateStore from "./useMutateUpdateStore";
import { useFeedback } from "@/contexts/feedback";

export default function useUpdateStore(initialStore: Store) {
    const refetchQuery = useRefetchQuery();

    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending } = useMutateUpdateStore(initialStore.id);
    
    const { state: currentStore, updateProps } = useUpdateProps(initialStore);

    const { changes, hasChanges } = useChanges(currentStore, initialStore);

    const updateStore = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                type: 'danger',
                message: 'No changes detected',
            })
            return;
        }

        try {
            await mutateAsync(changes);
            
            setFeedback({
                type: 'success',
                message: 'Store has been updated',
            })

            refetchQuery(['stores']);
            refetchQuery(['store', initialStore.id]);
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    return {
        currentStore,
        updateProps,
        updateStore,
        isPending,
    };
}