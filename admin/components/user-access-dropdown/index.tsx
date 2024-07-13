import Dropdown, { DropdownItem } from "@/components/dropdown";
import { ADMIN_ROLE, PERSONNEL_ROLE } from "@/utils/constants";
import { twMerge } from "tailwind-merge";
import LockIcon from "@/assets/icons/LockIcon";
import { User, UserRole } from "@/utils/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";

export default function UserAccessDropdown({ user, onChange, className }: {
    user: User;
    onChange: (role: UserRole) => void;
    className?: string;
}) {
    const { data: self } = useCurrentUser();

    const isAdmin = useSelfIsAdmin();

    const canEditRole = isAdmin && user.id !== self?.id;

    const accessDropdownItems: DropdownItem<UserRole>[] = [
        { id: ADMIN_ROLE, text: 'Administrator' },
        { id: PERSONNEL_ROLE, text: 'Personnel' },
    ];
    return(
        <Dropdown 
            label="Role"
            activeItemId={user.role}
            items={accessDropdownItems}
            className={twMerge(
                "min-w-dropdown px-4 py-3 border-[1px] border-tertiary",
                canEditRole && 'hover:bg-secondary',
                className,
            )}
            disabled={!canEditRole}
            disabledIcon={<LockIcon size={18} />}
            onChange={onChange}
        />
    )
}