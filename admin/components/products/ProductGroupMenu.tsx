import { ProductGroup } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";

export default function ProductGroupMenu({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const firstGroup: MenuGroup = [
        { text: 'View group', icon: <ViewIcon size={16} /> },
        { text: 'Edit group', icon: <EditIcon size={16} /> },
    ]
    const secondGroup: MenuGroup = [
        { text: 'Delete group', icon: <BinIcon size={16} />, type: 'danger' },
    ]
    const groups: MenuGroup[] = [firstGroup, secondGroup];

    return(
        <Menu 
            groups={groups}
        />
    )
}