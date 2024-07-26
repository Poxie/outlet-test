import getWeeklyProductsByDate from "@/api/weekly-products/getWeeklyProductsByDate";
import { useQuery } from "@tanstack/react-query";

export default function useQueryWeeklyDealByDate(date: string) {
    return useQuery({
        queryKey: ['products', date],
        queryFn: () => getWeeklyProductsByDate(date),
    })
}