import { User } from "@/utils/types";
import useRefetchQuery from "../react-query/useRefetchQuery";
import useMutateUpdateUser from "./useMutateUpdateUser";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useCurrentUser from "../useCurrentUser";
import { useFeedback } from "@/contexts/feedback";

export default function useUpdateUser(user: User) {
    const refetchQuery = useRefetchQuery();

    const { setFeedback } = useFeedback();
    
    const { data: self } = useCurrentUser();

    const { mutateAsync, isPending } = useMutateUpdateUser(user.id);

    const { state: currentUser, updateProps } = useUpdateProps(user);

    const { changes, hasChanges } = useChanges(currentUser, user);

    const updateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                type: 'danger',
                message: 'No changes detected',
            })
            return;
        }

        try {
            await mutateAsync(changes);

            setFeedback({
                type: 'success',
                message: 'User has been updated',
            })

            refetchQuery(['users', user.id]);
            refetchQuery(['users']);
            if(user.id === self?.id) {
                refetchQuery(['current-user']);
            }
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    return {
        currentUser,
        updateProps,
        updateUser,
        isPending,
    }
}