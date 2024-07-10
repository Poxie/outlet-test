import getUsers from "@/api/users/getUsers";
import Users from "@/components/users";
import prefetchQuery from "@/utils/prefetchQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function PeoplePage() {
    const queryClient = await prefetchQuery({
        queryKey: ['users'],
        queryFunction: getUsers,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Users />
        </HydrationBoundary>
    )
}