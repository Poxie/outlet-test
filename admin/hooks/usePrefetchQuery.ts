import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function usePrefetchQuery({ queryKey, queryFn, prefetchOnMount }: {
    queryKey?: string[];
    queryFn?: () => Promise<any>;
    prefetchOnMount?: boolean;
}) {
    const queryClient = useQueryClient();

    const hasPrefetched = useRef(false);

    useEffect(() => {
        if(!prefetchOnMount) return;
        prefetch();
    }, [prefetchOnMount, prefetch]);
    
    if(!queryKey || !queryFn) return;
    
    async function prefetch() {
        if(!queryKey || !queryFn) return;
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