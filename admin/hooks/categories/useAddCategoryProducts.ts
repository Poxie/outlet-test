import addCategoryProducts from "@/api/categories/addCategoryProducts";
import { useMutation } from "@tanstack/react-query";

export default function useAddCategoryProducts(categoryId: string) {
    return useMutation({
        mutationKey: ['category', categoryId],
        mutationFn: (images: string[]) => addCategoryProducts(categoryId, {
            parentId: categoryId,
            images,
        }),
    })
}