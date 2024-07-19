import deleteProducts from "@/api/products/deleteProducts";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteProducts(parentId: string) {
    return useMutation({
        mutationKey: ['products', 'delete'],
        mutationFn: (productIds: string[]) => deleteProducts(parentId, productIds),
    })
}