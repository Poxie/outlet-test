import { useQueryClient } from "@tanstack/react-query";

export default function useRefetchQuery() {
    const queryClient = useQueryClient();

    const refetchQuery = (queryKey: string[]) => {
        queryClient.invalidateQueries({ queryKey });
    }

    return refetchQuery;
}