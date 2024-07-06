import getCurrentWeekProducts from "@/api/weekly-products/getCurrentWeekProducts";
import getUpcomingWeekProducts from "@/api/weekly-products/getUpcomingWeekProducts";
import VeckansVaror from "@/components/veckans-varor";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function VeckansVarorPage() {
    const queryClient = new QueryClient();
    
    const prefetchCurrentWeek = queryClient.prefetchQuery({
        queryKey: ['weekly-products', 'current'],
        queryFn: getCurrentWeekProducts,
    })
    const prefetchUpcomingWeeks = queryClient.prefetchQuery({
        queryKey: ['weekly-products', 'upcoming'],
        queryFn: () => getUpcomingWeekProducts({ headers: {
            Cookie: cookies().toString(),
        } }),
    })
    await Promise.all([prefetchCurrentWeek, prefetchUpcomingWeeks]);

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <VeckansVaror />
        </HydrationBoundary>
    )
}