import deleteCategoryProducts from "@/api/categories/deleteCategoryProducts";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteCategoryProducts(categoryId: string) {
    return useMutation({
        mutationKey: ['category', categoryId],
        mutationFn: (productIds: string[]) => deleteCategoryProducts(categoryId, productIds),
    })
}