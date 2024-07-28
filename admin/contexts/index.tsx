"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "./modal";
import FeedbackProvider from "./feedback";
import { STALE_TIME } from "@/utils/constants";

export default function Providers({ children }: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIME,
            }
        }
    });

    return(
        <QueryClientProvider client={queryClient}>
            <FeedbackProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </FeedbackProvider>
        </QueryClientProvider>
    )
}