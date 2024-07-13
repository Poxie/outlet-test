import ModalHeader from "@/modals/ModalHeader";
import UserInformation from "../UserInformation";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import { getEmptyUserObject } from "@/utils";
import useUpdateProps from "@/hooks/useUpdateProps";
import UserPermission from "../UserPermission";
import UserPassword from "../UserPassword";
import ModalFooter from "@/modals/ModalFooter";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import useCreateUser from "@/hooks/users/useCreateUser";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";

const INITIAL_INFORMATION = getEmptyUserObject();
const INITIAL_PASSWORDS = {
    password: '',
    repeatPassword: '',
}

export default function CreateUserModal() {
    const refetchQuery = useRefetchQuery();

    const { closeModal } = useModal();
    
    const { mutateAsync, isPending } = useCreateUser();

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: userInfo, updateProps: updateInfo } = useUpdateProps(INITIAL_INFORMATION, {
        onUpdate: clearFeedback,
    });
    const { state: passwords, updateProps: updatePasswords } = useUpdateProps(INITIAL_PASSWORDS, {
        onUpdate: clearFeedback,
    });

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(passwords.password !== passwords.repeatPassword) {
            setFeedback({
                message: 'Passwords do not match',
                type: 'danger',
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

            refetchQuery(['users']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return(
        <>
        <ModalHeader 
            title="Add user"
        />

        <form onSubmit={createUser}>
            {feedback && (
                <Feedback 
                    {...feedback}
                    className="m-4 mb-0"
                />
            )}

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