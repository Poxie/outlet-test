import createProductGroup from "@/api/product-groups/createProductGroup";
import { CreateProductGroupProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateCreateProductGroup() {
    return useMutation({
        mutationKey: ['product-groups', 'create'],
        mutationFn: (productCategory: CreateProductGroupProps) => createProductGroup(productCategory),
    })
}