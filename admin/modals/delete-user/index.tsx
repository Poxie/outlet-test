import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ConfirmModal from "../confirm";
import { useModal } from "@/contexts/modal";
import useDeleteUser from "@/hooks/users/useDeleteUser";
import { User } from "@/utils/types";
import { useState } from "react";

export default function DeleteUserModal({ user }: {
    user: User;
}) {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();

    const { mutateAsync } = useDeleteUser(user.id);

    const [loading, setLoading] = useState(false);

    if(!user) return null;

    const deleteUser = async () => {
        setLoading(true);

        try {
            await mutateAsync();
            closeModal();
            refetchQuery(['users']);
        } catch (error) {
            console.error(error);
            setLoading(false);
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
            loading={loading}
        />
    )
}