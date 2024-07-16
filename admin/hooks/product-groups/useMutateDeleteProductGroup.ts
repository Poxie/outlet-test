import deleteProductGroup from "@/api/product-groups/deleteProductGroup";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteProductGroup(productGroupId: string) {
    return useMutation({
        mutationKey: ['product-groups', productGroupId],
        mutationFn: () => deleteProductGroup(productGroupId),
    })
}