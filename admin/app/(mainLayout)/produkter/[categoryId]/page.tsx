import getCategoryById from "@/api/categories/getCategoryById";
import Category from "@/components/products/category"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { cookies } from "next/headers";

export default async function CategoryPage({ params: { categoryId } }: {
    params: { categoryId: string }
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId, {
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Category categoryId={categoryId} />
        </HydrationBoundary>
    )
}