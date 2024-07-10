import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import WeeksProducts from "@/components/veckans-varor/week";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function WeeksProductsPage({ params: { date } }: {
    params: { date: string };
}) {
    const queryClient = await prefetchQuery({
        queryKey: ['weekly-products', 'all'],
        queryFunction: getAllWeekProducts,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WeeksProducts date={date} />
        </HydrationBoundary>
    );
}