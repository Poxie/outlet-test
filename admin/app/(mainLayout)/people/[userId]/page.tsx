import getUserById from "@/api/users/getUserById";
import User from "@/components/users/user";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function PersonPage({ params: { userId } }: {
    params: { userId: string };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById(userId, {
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <User userId={userId} />
        </HydrationBoundary>
    )
}