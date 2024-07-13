import PersonIcon from "@/assets/icons/PersonIcon";
import Menu, { MenuGroup } from "../menu";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { User } from "@/utils/types";
import { useModal } from "@/contexts/modal";
import DeleteUserModal from "@/modals/delete-user";
import EditUser from "@/modals/user-profile/edit-user";

export default function UserTableRowMenu({ user, self }: {
    user: User;
    self: User;
}) {
    const { setModal } = useModal();

    const openDeleteModal = () => {
        setModal(<DeleteUserModal user={user} />)
    }
    const openEditModal = () => {
        setModal(<EditUser userId={user.id} />);
    }

    const canEdit = self.id === user.id || self.role === 'ADMINISTRATOR';
    const canRemove = self.role === 'ADMINISTRATOR' && self.id !== user.id;

    const firstGroup: MenuGroup = [
        { text: 'View user', icon: <PersonIcon size={16} />, onClick: openEditModal },
        canEdit && { text: 'Edit user', icon: <EditIcon size={16} />, onClick: openEditModal }
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
            <Menu groups={menuGroups} />
        </div>
    )
}