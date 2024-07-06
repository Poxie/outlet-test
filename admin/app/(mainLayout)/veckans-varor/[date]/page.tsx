import getProductsByDate from "@/api/weekly-products/getProductsByDate";
import WeeksProducts from "@/components/veckans-varor/week";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function WeeksProductsPage({ params: { date } }: {
    params: { date: string };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['weekly-products', date],
        queryFn: () => getProductsByDate(date, {
            headers: {
                Cookie: cookies().toString(),
            }
        }),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WeeksProducts date={date} />
        </HydrationBoundary>
    );
}