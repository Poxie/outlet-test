import { User } from "@/utils/types";
import useRefetchQuery from "../react-query/useRefetchQuery";
import useMutateUpdateUser from "./useMutateUpdateUser";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useCurrentUser from "../useCurrentUser";

export default function useUpdateUser(user: User) {
    const refetchQuery = useRefetchQuery();

    const { data: self } = useCurrentUser();

    const { mutateAsync, isPending } = useMutateUpdateUser(user.id);

    const { state: currentUser, updateProps } = useUpdateProps(user);

    const { changes, hasChanges } = useChanges(currentUser, user);

    const updateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            return;
        }

        try {
            await mutateAsync(changes);

            refetchQuery(['user', user.id]);
            refetchQuery(['users']);
            if(user.id === self?.id) {
                refetchQuery(['current-user']);
            }
        } catch(error: any) {
            console.error(error);
        }
    }

    return {
        currentUser,
        updateProps,
        updateUser,
        isPending,
    }
}