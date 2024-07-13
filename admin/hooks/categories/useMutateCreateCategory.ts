import createCategory from "@/api/categories/createCategory";
import { MutableCategoryProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateCreateCategory() {
    return useMutation({
        mutationKey: ['create-category'],
        mutationFn: (category: MutableCategoryProps) => createCategory(category)
    })
}