import getCurrentUser from "@/api/users/getCurrentUser";
import CreateUser from "@/components/users/user/CreateUser";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function CreateUserPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['current-user'],
        queryFn: () => getCurrentUser({
            headers: {
                Cookie: cookies().toString(),
            }
        }),
    })
    
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateUser />
        </HydrationBoundary>
    )
}