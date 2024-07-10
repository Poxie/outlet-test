import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function prefetchQueryWithArgument({ queryKey, argument, queryFunction }: {
    queryKey: string[];
    argument: string;
    queryFunction: (argument: string, options: RequestInit) => Promise<any>;
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => queryFunction(argument, {
            headers: {
                Cookie: cookies().toString(),
            }
        }),
    });

    return queryClient;
}