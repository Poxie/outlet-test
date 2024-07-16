import getCategoryById from "@/api/categories/getCategoryById";
import { useQuery } from "@tanstack/react-query";

export default function useQueryCategoryById(categoryId: string) {
    return useQuery({
        queryKey: ['categories', categoryId],
        queryFn: () => getCategoryById(categoryId)
    })
}