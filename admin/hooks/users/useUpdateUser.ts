import updateUser from "@/api/users/updateUser";
import { User } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUser(id: string) {
    return useMutation({
        mutationKey: ['update-user', id],
        mutationFn: ({ changes }: {
            changes: Partial<User>;
        }) => updateUser(id, changes),
    })
}