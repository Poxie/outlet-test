import useUpdateProps from "@/hooks/useUpdateProps";
import useChanges from "@/hooks/useChanges";
import useFeedback from "@/hooks/useFeedback";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import Feedback from "@/components/feedback";
import UserPassword from "../UserPassword";
import ModalFooter from "@/modals/ModalFooter";

const DEFAULT_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function UpdatePasswordTab({ userId }: {
    userId: string;
}) {
    const { mutateAsync, isPending } = useUpdateUser(userId);

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { 
        state: passwords, 
        updateProps: updatePasswords, 
        resetProps: resetPasswords 
    } = useUpdateProps(DEFAULT_PASSWORDS);

    const { hasChanges } = useChanges(passwords, DEFAULT_PASSWORDS);

    const updatePassword = async () => {
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
        <>
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
            onConfirm={updatePassword}
            confirmText="Update password"
            confirmLoadingText="Updating password..."
            loading={isPending}
        />
        </>
    )
}