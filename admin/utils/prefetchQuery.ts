import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function prefetchQuery({ queryKey, queryFunction }: {
    queryKey: string[];
    queryFunction: (options: RequestInit) => Promise<any>;
}, queryClient?: QueryClient) {
    queryClient = queryClient || new QueryClient();

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => queryFunction({
            headers: {
                Cookie: cookies().toString(),
            }
        }),
    });

    return queryClient;
}