import deleteStore from "@/api/stores/deleteStore";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteStore(id: string) {
    return useMutation({
        mutationKey: ['store', id],
        mutationFn: () => deleteStore(id),
    })
}