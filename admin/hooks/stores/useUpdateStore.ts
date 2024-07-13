import { Store } from "@/utils/types";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useRefetchQuery from "../react-query/useRefetchQuery";
import useMutateUpdateStore from "./useMutateUpdateStore";

export default function useUpdateStore(initialStore: Store) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateUpdateStore(initialStore.id);
    
    const { state: currentStore, updateProps } = useUpdateProps(initialStore);

    const { changes, hasChanges } = useChanges(currentStore, initialStore);

    const updateStore = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            return;
        }

        try {
            await mutateAsync(changes);

            refetchQuery(['stores']);
            refetchQuery(['store', initialStore.id]);
        } catch(error: any) {
            console.error(error);
        }
    }

    return {
        currentStore,
        updateProps,
        updateStore,
        isPending,
    };
}