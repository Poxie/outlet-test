import getProductGroupById from "@/api/product-groups/getProductGroupById";
import { useQuery } from "@tanstack/react-query";

export default function useQueryProductGroupById(productGroupId: string) {
    return useQuery({
        queryKey: ['product-groups', productGroupId],
        queryFn: () => getProductGroupById(productGroupId),
    })
}