import getCategoryById from "@/api/categories/getCategoryById";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoryById(categoryId: string) {
    return useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId),
    })
}