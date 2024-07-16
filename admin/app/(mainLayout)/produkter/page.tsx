import Products from "@/components/products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductsPage() {
    const queryClient = new QueryClient();

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products />
        </HydrationBoundary>
    )
}