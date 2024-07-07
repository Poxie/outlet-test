import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts";
import Products from "@/components/products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function ProductsPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["categories", 'with-counts'],
        queryFn: () => getCategoriesWithProductCounts({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products />
        </HydrationBoundary>
    )
}