import getUsers from "@/api/users/getUsers";
import Users from "@/components/users";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { cookies } from "next/headers";

export default async function PeoplePage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: () => getUsers({
            headers: {
                Cookie: cookies().toString(),
            }
        })
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Users />
        </HydrationBoundary>
    )
}