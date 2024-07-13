import { Store } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ADMIN_ROLE } from "@/utils/constants";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { useModal } from "@/contexts/modal";
import DeleteStoreModal from "@/modals/delete-store";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import EditStoreModal from "@/modals/store/edit-store";

export default function StoresTableMenu({ store }: { 
    store: Store; 
}) {
    const { setModal } = useModal();

    const isAdmin = useSelfIsAdmin();

    const openEditModal = () => setModal(<EditStoreModal storeId={store.id} />);
    const openDeleteModal = () => setModal(<DeleteStoreModal store={store} />);

    const firstGroup: MenuGroup = [
        { text: 'View store', icon: <ViewIcon size={16} />, onClick: openEditModal },
    ];
    const secondGroup: MenuGroup = [];

    if(isAdmin) {
        firstGroup.push({
            text: 'Edit store',
            icon: <EditIcon size={16} />,
            onClick: openEditModal,
        })
        secondGroup.push({
            text: 'Delete store',
            icon: <BinIcon size={16} />,
            type: 'danger',
            onClick: openDeleteModal,
        })
    }

    const menuGroups: MenuGroup[] = [firstGroup];
    if(secondGroup.length) menuGroups.push(secondGroup);

    return(
        <Menu groups={menuGroups} />
    )
}