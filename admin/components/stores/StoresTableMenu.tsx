import { Store } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ADMIN_ROLE } from "@/utils/constants";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";

export default function StoresTableMenu({ store }: { 
    store: Store; 
}) {
    const { data: currentUser } = useCurrentUser();

    const firstGroup: MenuGroup = [
        { text: 'View store', icon: <ViewIcon size={16} />, href: `/stores/${store.id}` },
    ];
    const secondGroup: MenuGroup = [];

    if(currentUser?.role === ADMIN_ROLE) {
        firstGroup.push({
            text: 'Edit store',
            icon: <EditIcon size={16} />,
            href: `/stores/${store.id}`,
        })
        secondGroup.push({
            text: 'Delete store',
            icon: <BinIcon size={16} />,
            type: 'danger',
        })
    }

    const menuGroups: MenuGroup[] = [firstGroup];
    if(secondGroup.length) menuGroups.push(secondGroup);

    return(
        <Menu groups={menuGroups} />
    )
}