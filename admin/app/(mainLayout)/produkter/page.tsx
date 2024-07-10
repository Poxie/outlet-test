import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts";
import Products from "@/components/products";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductsPage() {
    const queryClient = await prefetchQuery({
        queryKey: ["categories", 'with-counts'],
        queryFunction: getCategoriesWithProductCounts,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products />
        </HydrationBoundary>
    )
}