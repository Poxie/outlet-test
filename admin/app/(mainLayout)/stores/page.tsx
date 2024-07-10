import getStores from "@/api/stores/getStores";
import Stores from "@/components/stores";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function StoresPage() {
    const queryClient = await prefetchQuery({
        queryKey: ["stores"],
        queryFunction: getStores,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Stores />
        </HydrationBoundary>
    )
}