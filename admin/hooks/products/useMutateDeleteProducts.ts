import deleteProducts from "@/api/products/deleteProducts";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteProducts() {
    return useMutation({
        mutationKey: ['products', 'deletee'],
        mutationFn: (productIds: string[]) => deleteProducts(productIds),
    })
}