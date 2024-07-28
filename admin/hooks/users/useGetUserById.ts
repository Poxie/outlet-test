import getUserById from "@/api/users/getUserById";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserById(id: string) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id),
    })
}