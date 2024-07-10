import getStoreById from "@/api/stores/getStoreById";
import { useQuery } from "@tanstack/react-query";

export default function useGetStoreById(id: string) {
    return useQuery({
        queryKey: ['store', id],
        queryFn: () => getStoreById(id),
    })
}