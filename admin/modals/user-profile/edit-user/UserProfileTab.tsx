import { User } from "@/utils/types";
import useChanges from "@/hooks/useChanges";
import useUpdateProps from "@/hooks/useUpdateProps";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import UserInformation from "../UserInformation";
import ModalSectionHeader from "@/modals/ModalSectionHeader";
import UserPermission from "../UserPermission";
import ModalFooter from "@/modals/ModalFooter";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

export default function UserProfileTab({ user }: {
    user: User;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useUpdateUser(user.id);

    const { data: self } = useCurrentUser();
    const isAdmin = useSelfIsAdmin();
    const canEdit = self?.id === user.id || isAdmin;

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: currentUser, updateProps } = useUpdateProps(user, {
        onUpdate: clearFeedback,
    });

    const { changes, hasChanges } = useChanges(currentUser, user);

    const updateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                message: 'No changes have been made',
                type: 'danger',
            })
            return;
        }

        try {
            await mutateAsync(changes);

            setFeedback({
                message: 'User has been updated',
                type: 'success',
            })
            refetchQuery(['user', user.id]);
            refetchQuery(['users']);
            if(user.id === self?.id) {
                refetchQuery(['current-user']);
            }
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return(
        <form onSubmit={updateUser}>
            {feedback && (
                <Feedback 
                    {...feedback}
                    className="m-4 mb-0"
                />
            )}

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