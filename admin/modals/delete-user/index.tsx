import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ConfirmModal from "../confirm";
import { useModal } from "@/contexts/modal";
import { User } from "@/utils/types";
import useMutateDeleteUser from "@/hooks/users/useMutateDeleteUser";
import { useFeedback } from "@/contexts/feedback";

export default function DeleteUserModal({ user }: {
    user: User;
}) {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending } = useMutateDeleteUser(user.id);

    const deleteUser = async () => {
        try {
            await mutateAsync();

            setFeedback({
                type: 'success',
                message: 'User has been removed',
            })

            refetchQuery(['users']);
            closeModal();
        } catch (error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    return(
        <ConfirmModal 
            title={`Remove ${user.name}`}
            message="Are you sure you want to remove this user? They will lose all access to the system. This action cannot be undone."
            onCancel={closeModal}
            onConfirm={deleteUser}
            confirmText="Remove user"
            confirmLoadingText="Removing user..."
            loading={isPending}
        />
    )
}