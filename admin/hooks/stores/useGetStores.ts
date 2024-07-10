import getStores from "@/api/stores/getStores";
import { useQuery } from "@tanstack/react-query";

export default function useGetStores() {
    return useQuery({
        queryKey: ["stores"],
        queryFn: getStores,
    })
}