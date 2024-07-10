import createStore from "@/api/stores/createStore";
import { CreateStoreProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreateStore() {
    return useMutation({
        mutationKey: ['create-store'],
        mutationFn: ({ store }: {
            store: CreateStoreProps;
        }) => createStore(store)
    })
}