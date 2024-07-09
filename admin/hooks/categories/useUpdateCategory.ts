import updateCategory from "@/api/categories/updateCategory";
import { ProductCategory } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCategory(categoryId: string) {
    return useMutation({
        mutationKey: ['category', categoryId],
        mutationFn: ({ changes }: {
            changes: Partial<ProductCategory>;
        }) => updateCategory(categoryId, changes),
    })
}