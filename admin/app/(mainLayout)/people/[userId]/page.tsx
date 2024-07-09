import getCurrentUser from "@/api/users/getCurrentUser";
import getUserById from "@/api/users/getUserById";
import User from "@/components/users/user";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function PersonPage({ params: { userId } }: {
    params: { userId: string };
}) {
    const queryClient = new QueryClient();

    const userRequest = queryClient.prefetchQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById(userId, {
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })
    const selfRequest = queryClient.prefetchQuery({
        queryKey: ['current-user'],
        queryFn: () => getCurrentUser({
            headers: {
                Cookie: cookies().toString(),
            },
        }),
    })

    await Promise.all([userRequest, selfRequest]);

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <User userId={userId} />
        </HydrationBoundary>
    )
}