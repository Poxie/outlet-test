import getCategoryWithProducts from "@/api/products/getCategoryWithProducts";
import ProductPage from "@/components/product-page";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductCategory({ params: { categoryId } }: {
    params: { categoryId: string };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products', categoryId],
        queryFn: () => getCategoryWithProducts(categoryId),
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage categoryId={categoryId} />
        </HydrationBoundary>
    )
}