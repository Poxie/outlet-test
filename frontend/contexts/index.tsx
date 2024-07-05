"use client";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoritesProvider from "./favorites";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if(isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
        </QueryClientProvider>
    )
}