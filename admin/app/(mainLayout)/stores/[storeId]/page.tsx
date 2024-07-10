import getStoreById from "@/api/stores/getStoreById";
import Store from "@/components/stores/store";
import prefetchQueryWithArgument from "@/utils/prefetchQueryWithArgument";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function StorePage({ params: { storeId } }: {
    params: { storeId: string };
}) {
    const queryClient = await prefetchQueryWithArgument({
        queryKey: ['store', storeId],
        queryFunction: getStoreById,
        argument: storeId,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Store storeId={storeId} />
        </HydrationBoundary>
    )
}