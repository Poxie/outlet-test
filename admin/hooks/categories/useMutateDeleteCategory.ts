import deleteCategory from "@/api/categories/deleteCategory";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteCategory(categoryId: string) {
    return useMutation({
        mutationKey: ['delete-category', categoryId],
        mutationFn: () => deleteCategory(categoryId),
    })
}