import getCurrentUser from "@/api/users/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: getCurrentUser,
    })
}