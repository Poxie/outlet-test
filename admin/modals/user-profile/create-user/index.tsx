import ModalHeader from "@/modals/ModalHeader";
import UserInformation from "../UserInformation";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import UserPermission from "../UserPermission";
import UserPassword from "../UserPassword";
import ModalFooter from "@/modals/ModalFooter";
import useCreateUser from "@/hooks/users/useCreateUser";

export default function CreateUserModal() {
    const { userInfo, passwords, updateInfo, updatePasswords, createUser, isPending } = useCreateUser();

    return(
        <>
        <ModalHeader 
            title="Add user"
        />

        <form onSubmit={createUser}>
            <UserInformation 
                updateProps={updateInfo}
                user={userInfo}
                canEdit
            />

            <ModalSectionHeader>
                Permissions
            </ModalSectionHeader>

            <UserPermission 
                updateProps={updateInfo}
                user={userInfo}
            />

            <ModalSectionHeader>
                Password
            </ModalSectionHeader>

            <UserPassword 
                updatePasswords={updatePasswords}
                passwords={passwords}
            />

            <ModalFooter 
                confirmText="Add user"
                confirmLoadingText="Adding user..."
                loading={isPending}
            />
        </form>
        </>
    )
}