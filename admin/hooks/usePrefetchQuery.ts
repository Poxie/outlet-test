import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function usePrefetchQuery({ queryKey, queryFn }: {
    queryKey?: string[];
    queryFn?: () => Promise<any>;
}) {
    const queryClient = useQueryClient();

    const hasPrefetched = useRef(false);
    
    if(!queryKey || !queryFn) return;

    const prefetch = async () => {
        if(hasPrefetched.current) return;

        await queryClient.prefetchQuery({ 
            queryKey, 
            queryFn,
            staleTime: 10000000,
        });
        hasPrefetched.current = true;
    }

    return prefetch;
}