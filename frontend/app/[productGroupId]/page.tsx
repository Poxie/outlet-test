import getProductGroup from "@/api/products/getProductGroup";
import Products from "@/components/product-page";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductCategory({ params: { productGroupId } }: {
    params: { productGroupId: string };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['product-groups', productGroupId],
        queryFn: () => getProductGroup(productGroupId),
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products productGroupId={productGroupId} />
        </HydrationBoundary>
    )
}