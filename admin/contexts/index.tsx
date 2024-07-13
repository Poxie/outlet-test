"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "./modal";
import FeedbackProvider from "./feedback";

export default function Providers({ children }: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

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