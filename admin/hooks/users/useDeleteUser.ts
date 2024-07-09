import deleteUser from "@/api/users/deleteUser";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteUser(id: string) {
    return useMutation({
        mutationKey: ['delete-user', id],
        mutationFn: () => deleteUser(id),
    })
}