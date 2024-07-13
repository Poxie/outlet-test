import deleteCategory from "@/api/categories/deleteCategory";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteCategory(id: string) {
    return useMutation({
        mutationKey: ['delete-category', id],
        mutationFn: () => deleteCategory(id),
    })
}