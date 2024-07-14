import useUpdateProps from "@/hooks/useUpdateProps";
import useChanges from "@/hooks/useChanges";
import UserPassword from "../UserPassword";
import ModalFooter from "@/modals/ModalFooter";
import useMutateUpdateUser from "@/hooks/users/useMutateUpdateUser";
import { User } from "@/utils/types";
import { useFeedback } from "@/contexts/feedback";

const DEFAULT_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function UpdatePasswordTab({ user }: {
    user: User;
}) {
    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending } = useMutateUpdateUser(user.id);

    const { 
        state: passwords, 
        updateProps: updatePasswords, 
        resetProps: resetPasswords 
    } = useUpdateProps(DEFAULT_PASSWORDS);

    const { hasChanges } = useChanges(passwords, DEFAULT_PASSWORDS);

    const updatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                message: 'No changes have been made',
                type: 'danger',
            })
            return;
        }

        if(passwords.password !== passwords.repeatPassword) {
            setFeedback({
                message: 'Passwords do not match',
                type: 'danger',
            })
            return;
        }

        try {
            await mutateAsync({ password: passwords.password });
            resetPasswords();
            setFeedback({
                message: 'Password has been updated',
                type: 'success',
            })
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return(
        <form onSubmit={updatePassword}>
            <UserPassword 
                passwords={passwords} 
                updatePasswords={updatePasswords} 
            />

            <ModalFooter 
                confirmText="Update password"
                confirmLoadingText="Updating password..."
                loading={isPending}
            />
        </form>
    )
}