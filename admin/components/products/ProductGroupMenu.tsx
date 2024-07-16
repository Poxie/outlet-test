import { ProductGroup } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { useModal } from "@/contexts/modal";
import DeleteProductGroup from "@/modals/product-group/delete-product-group";

export default function ProductGroupMenu({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { setModal } = useModal();

    const openDeleteModal = () => setModal(<DeleteProductGroup productGroup={productGroup} />);

    const firstGroup: MenuGroup = [
        { text: 'View group', icon: <ViewIcon size={16} /> },
        { text: 'Edit group', icon: <EditIcon size={16} /> },
    ]
    const secondGroup: MenuGroup = [
        { text: 'Delete group', icon: <BinIcon size={16} />, type: 'danger', onClick: openDeleteModal },
    ]
    const groups: MenuGroup[] = [firstGroup, secondGroup];

    return(
        <Menu 
            groups={groups}
        />
    )
}