import { getEmptyUserObject } from "@/utils";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import useMutateCreateUser from "./useMutateCreateUser";
import useUpdateProps from "../useUpdateProps";

const INITIAL_INFORMATION = getEmptyUserObject();
const INITIAL_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function useCreateUser() {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();
    
    const { mutateAsync, isPending } = useMutateCreateUser();

    const { state: userInfo, updateProps: updateInfo } = useUpdateProps(INITIAL_INFORMATION);
    const { state: passwords, updateProps: updatePasswords } = useUpdateProps(INITIAL_PASSWORDS);

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(passwords.password !== passwords.repeatPassword) {
            return;
        }

        // Remove id and createdAt from the user object
        const { id, createdAt, ...createProps } = userInfo;

        try {
            await mutateAsync({
                ...createProps,
                password: passwords.password,
            })

            refetchQuery(['users']);
            closeModal();
        } catch(error: any) {
            console.error(error);
        }
    }

    return {
        userInfo,
        passwords,
        updateInfo,
        updatePasswords,
        createUser,
        isPending,
    }
}