import { User } from "@/utils/types";
import UserInformation from "../UserInformation";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import UserPermission from "../UserPermission";
import ModalFooter from "@/modals/ModalFooter";
import useUpdateUser from "@/hooks/users/useUpdateUser";

export default function UserProfileTab({ user, canEdit }: {
    user: User;
    canEdit: boolean;
}) {
    const { currentUser, updateProps, updateUser, isPending } = useUpdateUser(user);

    return(
        <form onSubmit={updateUser}>
            <UserInformation 
                user={currentUser}
                updateProps={updateProps}
                canEdit={canEdit}
            />
            <ModalSectionHeader>
                User permission
            </ModalSectionHeader>
            <UserPermission 
                user={currentUser}
                updateProps={updateProps}
            />

            {canEdit && (
                <ModalFooter 
                    confirmText="Save changes"
                    confirmLoadingText="Saving changes..."
                    loading={isPending}
                />
            )}
        </form>
    )
}