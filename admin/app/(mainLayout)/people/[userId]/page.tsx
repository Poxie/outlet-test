import getUserById from "@/api/users/getUserById";
import User from "@/components/users/user";
import prefetchQueryWithArgument from "@/utils/prefetchQueryWithArgument";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function PersonPage({ params: { userId } }: {
    params: { userId: string };
}) {
    const queryClient = await prefetchQueryWithArgument({
        queryKey: ['user', userId],
        queryFunction: getUserById,
        argument: userId,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <User userId={userId} />
        </HydrationBoundary>
    )
}