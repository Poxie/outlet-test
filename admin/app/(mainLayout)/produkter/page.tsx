import getAllCategories from "@/api/categories/getAllCategories";
import getAllProductGroups from "@/api/product-groups/getAllProductGroups";
import Products from "@/components/products";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function ProductsPage() {
    const queryClient = await prefetchQuery({
        queryKey: ['categories'],
        queryFunction: () => getAllCategories({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })
    await prefetchQuery({
        queryKey: ['product-groups'],
        queryFunction: () => getAllProductGroups({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    }, queryClient);

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products />
        </HydrationBoundary>
    )
}