import UserAccessDropdown from "@/components/user-access-dropdown";
import { User } from "@/utils/types";

export default function UserPermission({ user, updateProps }: {
    user: User;
    updateProps: (props: Partial<User>) => void;
}) {
    return(
        <div className="p-4">
            <UserAccessDropdown 
                className="w-full"
                onChange={role => updateProps({ role })}
                user={user}
            />
        </div>
    )
}