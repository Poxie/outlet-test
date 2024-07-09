import { User } from "@/utils/types"
import Button from "../button";
import Menu, { MenuGroup } from "../menu";
import MenuIcon from "@/assets/icons/MenuIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import PersonIcon from "@/assets/icons/PersonIcon";

export default function UsersTableRow({ user, self }: {
    user: User;
    self: User;
}) {
    const menuGroups: MenuGroup[] = [
        [
            { text: 'View user', icon: <PersonIcon size={16} />, href: `/people/${user.id}` },
            { text: 'Edit user', icon: <EditIcon size={16} />, href: `/people/${user.id}` },
        ],
        [
            { text: 'Delete user', type: 'danger', icon: <BinIcon size={16} /> }
        ]
    ]

    const userInitials = user.name.split(' ').map(name => name[0]).join('');
    const userRole = user.role.slice(0,1) + user.role.slice(1).toLowerCase();
    const userAddedAt = new Date(parseInt(user.createdAt)).toLocaleDateString();
    const canEdit = self.role === 'ADMINISTRATOR' || self.id === user.id;

    const tdClassName = 'p-4';
    return (
        <tr className="divide-y-[1px] divide-secondary">
            <td className={tdClassName}>
                <div className="flex items-center gap-3">
                    <div className="w-8 aspect-square flex items-center justify-center bg-tertiary border-[1px] border-quaternary rounded-full uppercase text-xs font-bold">
                        {userInitials}
                    </div>
                    <div>
                        {user.name}
                        {self.id === user.id && (
                            <span className="text-sm text-muted ml-1">(You)</span>
                        )}
                    </div>
                </div>
            </td>
            <td className={tdClassName}>{user.email}</td>
            <td className={tdClassName}>{userRole}</td>
            <td className={tdClassName}>{userAddedAt}</td>
            <td className={tdClassName}>
                {canEdit && (
                    <div className="flex justify-end">
                        <Menu 
                            groups={menuGroups}
                            className="w-8 aspect-square flex items-center justify-center"
                        >
                            <MenuIcon className="w-1" />
                        </Menu>
                    </div>
                )}
            </td>
        </tr>
    )
}