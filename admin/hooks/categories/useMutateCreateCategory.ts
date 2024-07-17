import createCategory from "@/api/categories/createCategory";
import { CreateCategoryProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateCreateCategory() {
    return useMutation({
        mutationKey: ['categories', 'create'],
        mutationFn: (newCategory: CreateCategoryProps) => createCategory(newCategory),
    })
}