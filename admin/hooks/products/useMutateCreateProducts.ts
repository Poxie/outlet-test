import createProducts from "@/api/products/createProducts";
import { useMutation } from "@tanstack/react-query";

export default function useMutateCreateProducts(parentId: string) {
    return useMutation({
        mutationKey: ['products', 'create'],
        mutationFn: (images: string[]) => createProducts(parentId, images),
    })
}