import getAllProductGroups from "@/api/product-groups/getAllProductGroups";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllProductGroups() {
    return useQuery({
        queryKey: ['product-groups'],
        queryFn: getAllProductGroups,
    })
}