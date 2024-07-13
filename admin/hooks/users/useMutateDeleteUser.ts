import deleteUser from "@/api/users/deleteUser";
import { useMutation } from "@tanstack/react-query";

export default function useMutateDeleteUser(id: string) {
    return useMutation({
        mutationKey: ['delete-user', id],
        mutationFn: () => deleteUser(id),
    })
}