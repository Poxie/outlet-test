import updateProductGroup from "@/api/product-groups/updateProductGroup";
import { MutableProductGroupProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateUpdateProductGroup(productGroupId: string) {
    return useMutation({
        mutationKey: ['product-groups', productGroupId],
        mutationFn: (changes: Partial<MutableProductGroupProps>) => updateProductGroup(productGroupId, changes),
    })
}