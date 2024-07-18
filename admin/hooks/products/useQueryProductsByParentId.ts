import getProductsByParentId from "@/api/products/getProductsByParentId";
import { useQuery } from "@tanstack/react-query";

export default function useQueryProductsByParentId(parentId: string) {
    return useQuery({
        queryKey: ['products', parentId],
        queryFn: () => getProductsByParentId(parentId),
    })
}