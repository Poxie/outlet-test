import createUser from "@/api/users/createUser";
import { MutableUserProps, User } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreateUser() {
    return useMutation({
        mutationKey: ['create-user'],
        mutationFn: ({ user }: {
            user: MutableUserProps & {
                password: string;
            };
        }) => createUser(user)
    })
}