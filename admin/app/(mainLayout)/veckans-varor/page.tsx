import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import VeckansVaror from "@/components/veckans-varor";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function VeckansVarorPage() {
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ['weekly-products', 'all'],
        queryFn: () => getAllWeekProducts({
            headers: {
                Cookie: cookies().toString(),
            }
        }),
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <VeckansVaror />
        </HydrationBoundary>
    )
}