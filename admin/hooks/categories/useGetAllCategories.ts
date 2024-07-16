import getAllCategories from "@/api/categories/getAllCategories";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
    })
}