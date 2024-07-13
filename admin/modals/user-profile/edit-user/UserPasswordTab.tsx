import useUpdateProps from "@/hooks/useUpdateProps";
import useChanges from "@/hooks/useChanges";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import UserPassword from "../UserPassword";
import ModalFooter from "@/modals/ModalFooter";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import useMutateUpdateUser from "@/hooks/users/useMutateUpdateUser";
import { User } from "@/utils/types";

const DEFAULT_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function UpdatePasswordTab({ user }: {
    user: User;
}) {
    const { mutateAsync, isPending } = useMutateUpdateUser(user.id);

    const { feedback, setFeedback, clearFeedback } = useFeedback();

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
            {feedback && (
                <Feedback 
                    {...feedback}
                    className="m-4 mb-0"
                />
            )}

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