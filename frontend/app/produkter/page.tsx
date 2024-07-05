import getCategoriesWithProducts from "@/api/products/getCategoriesWithProducts";
import Products from "@/components/products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductsPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: getCategoriesWithProducts,
    })
    
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products />
        </HydrationBoundary>
    )
}