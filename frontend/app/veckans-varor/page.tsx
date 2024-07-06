import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";
import VeckansVaror from "@/components/veckans-varor";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function VeckansVarorPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['weeklyProducts'],
        queryFn: getCurrentWeeksProducts,
    })
    
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <VeckansVaror />
        </HydrationBoundary>
    )
}