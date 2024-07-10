import updateStore from "@/api/stores/updateStore";
import { MutableStoreProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateStore(id: string) {
    return useMutation({
        mutationKey: ['store', id],
        mutationFn: ({ changes }: {
            changes: Partial<MutableStoreProps>
        }) => updateStore(id, changes)
    })
}