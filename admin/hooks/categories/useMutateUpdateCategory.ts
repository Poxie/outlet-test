import updateCategory from "@/api/categories/updateCategory";
import { Category, MutableCategoryProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateUpdateCategory(categoryId: string) {
    return useMutation({
        mutationKey: ['update-category', categoryId],
        mutationFn: (changes: Partial<MutableCategoryProps>) => updateCategory(categoryId, changes),
    })
}