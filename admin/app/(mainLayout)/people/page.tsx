import getCurrentUser from "@/api/users/getCurrentUser";
import getUsers from "@/api/users/getUsers";
import Users from "@/components/users";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { cookies } from "next/headers";

export default async function PeoplePage() {
    const queryClient = new QueryClient();

    const usersQuery = queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: () => getUsers({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })
    const selfQuery = queryClient.prefetchQuery({
        queryKey: ['current-user'],
        queryFn: () => getCurrentUser({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })

    await Promise.all([usersQuery, selfQuery]);

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Users />
        </HydrationBoundary>
    )
}