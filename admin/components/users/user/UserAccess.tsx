import Dropdown, { DropdownItem } from "@/components/dropdown";
import { useUser } from ".";
import { ADMIN_ROLE, PERSONNEL_ROLE } from "@/utils/constants";
import { twMerge } from "tailwind-merge";
import LockIcon from "@/assets/icons/LockIcon";

export default function UserAccess() {
    const { user, self } = useUser();

    const canEditRole = self.role === ADMIN_ROLE && user.id !== self.id;

    const accessDropdownItems: DropdownItem[] = [
        { id: ADMIN_ROLE, text: 'Administrator' },
        { id: PERSONNEL_ROLE, text: 'Personnel' },
    ]
    return(
        <div className="flex">
            <Dropdown 
                label="Role"
                activeItemId={user.role}
                items={accessDropdownItems}
                className={twMerge(
                    "min-w-dropdown px-4 py-3 border-[1px] border-tertiary",
                    canEditRole && 'hover:bg-secondary',
                )}
                disabled={!canEditRole}
                disabledIcon={<LockIcon size={18} />}
            />
        </div>
    )
}