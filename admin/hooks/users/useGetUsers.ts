import getUsers from "@/api/users/getUsers";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}