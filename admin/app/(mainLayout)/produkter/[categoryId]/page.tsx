import getCategoryById from "@/api/categories/getCategoryById";
import Category from "@/components/products/category"
import prefetchQueryWithArgument from "@/utils/prefetchQueryWithArgument";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function CategoryPage({ params: { categoryId } }: {
    params: { categoryId: string }
}) {
    const queryClient = await prefetchQueryWithArgument({
        queryKey: ['category', categoryId],
        queryFunction: getCategoryById,
        argument: categoryId,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Category categoryId={categoryId} />
        </HydrationBoundary>
    )
}