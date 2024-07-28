import getStoreById from "@/api/stores/getStoreById";
import { useQuery } from "@tanstack/react-query";

export default function useGetStoreById(id: string) {
    return useQuery({
        queryKey: ['stores', id],
        queryFn: () => getStoreById(id),
    })
}