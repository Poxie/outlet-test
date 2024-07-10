import { ADMIN_ROLE } from "@/utils/constants";
import useCurrentUser from "./useCurrentUser";

export default function useSelfIsAdmin() {
    const { data: currentUser } = useCurrentUser();
    return currentUser?.role === ADMIN_ROLE;
}