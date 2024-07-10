import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import VeckansVaror from "@/components/veckans-varor";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function VeckansVarorPage() {
    const queryClient = await prefetchQuery({
        queryKey: ['weekly-products', 'all'],
        queryFunction: getAllWeekProducts,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <VeckansVaror />
        </HydrationBoundary>
    )
}