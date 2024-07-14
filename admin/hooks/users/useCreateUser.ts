import { getEmptyUserObject } from "@/utils";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import useMutateCreateUser from "./useMutateCreateUser";
import useUpdateProps from "../useUpdateProps";
import { useFeedback } from "@/contexts/feedback";

const INITIAL_INFORMATION = getEmptyUserObject();
const INITIAL_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function useCreateUser() {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();
    
    const { mutateAsync, isPending } = useMutateCreateUser();

    const { state: userInfo, updateProps: updateInfo } = useUpdateProps(INITIAL_INFORMATION);
    const { state: passwords, updateProps: updatePasswords } = useUpdateProps(INITIAL_PASSWORDS);

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(passwords.password !== passwords.repeatPassword) {
            setFeedback({
                type: 'danger',
                message: 'Passwords do not match',
            })
            return;
        }

        // Remove id and createdAt from the user object
        const { id, createdAt, ...createProps } = userInfo;

        try {
            await mutateAsync({
                ...createProps,
                password: passwords.password,
            })

            setFeedback({
                type: 'success',
                message: 'User has been added',
            })

            refetchQuery(['users']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
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