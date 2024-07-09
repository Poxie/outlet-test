import PersonIcon from "@/assets/icons/PersonIcon";
import Menu, { MenuGroup } from "../menu";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { User } from "@/utils/types";
import MenuIcon from "@/assets/icons/MenuIcon";
import { useModal } from "@/contexts/modal";
import DeleteUserModal from "@/modals/delete-user";

export default function UserTableRowMenu({ user, self }: {
    user: User;
    self: User;
}) {
    const { setModal } = useModal();

    const openDeleteModal = () => {
        setModal(<DeleteUserModal user={user} />)
    }

    const canEdit = self.id === user.id || self.role === 'ADMINISTRATOR';
    const canRemove = self.role === 'ADMINISTRATOR' && self.id !== user.id;

    const firstGroup: MenuGroup = [
        { text: 'View user', icon: <PersonIcon size={16} />, href: `/people/${user.id}` },
        canEdit && { text: 'Edit user', icon: <EditIcon size={16} />, href: `/people/${user.id}` }
    ].filter(item => !!item);

    const secondGroup: MenuGroup = [
        { text: 'Delete user', type: 'danger', icon: <BinIcon size={16} />, onClick: openDeleteModal },
    ]

    const menuGroups: MenuGroup[] = [
        firstGroup,
    ]

    if(canRemove) menuGroups.push(secondGroup);

    return(
        <div className="flex justify-end">
            <Menu 
                groups={menuGroups}
                className="w-8 aspect-square flex items-center justify-center"
            >
                <MenuIcon className="w-1" />
            </Menu>
        </div>
    )
}