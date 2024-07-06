import loginUser from "@/api/users/loginUser";
import { useMutation } from "@tanstack/react-query";

export default function useLoginUser() {
    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: (data: {
            email: string;
            password: string;
        }) => loginUser(data)
    })
}