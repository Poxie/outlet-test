import updateCategory from "@/api/categories/updateCategory";
import { ProductCategory } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateUpdateCategory(categoryId: string) {
    return useMutation({
        mutationKey: ['category', categoryId],
        mutationFn: (changes: Partial<ProductCategory>) => updateCategory(categoryId, changes),
    })
}