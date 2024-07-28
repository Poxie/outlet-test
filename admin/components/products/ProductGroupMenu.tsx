import { ProductGroup } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { useModal } from "@/contexts/modal";
import DeleteProductGroup from "@/modals/product-group/delete-product-group";
import EditProductGroup from "@/modals/product-group/edit-product-group";
import getProductGroupById from "@/api/product-groups/getProductGroupById";

export default function ProductGroupMenu({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { setModal } = useModal();

    const openDeleteModal = () => setModal(<DeleteProductGroup productGroup={productGroup} />);
    const openEditModal = () => setModal(<EditProductGroup productGroupId={productGroup.id} />);

    const firstGroup: MenuGroup = [
        { text: 'View group', icon: <ViewIcon size={16} />, onClick: openEditModal },
        { text: 'Edit group', icon: <EditIcon size={16} />, onClick: openEditModal },
    ]
    const secondGroup: MenuGroup = [
        { text: 'Delete group', icon: <BinIcon size={16} />, type: 'danger', onClick: openDeleteModal },
    ]
    const groups: MenuGroup[] = [firstGroup, secondGroup];

    return(
        <Menu 
            groups={groups}
            prefetchQueryKey={['product-groups', productGroup.id]}
            prefetchQueryFn={() => getProductGroupById(productGroup.id)}
        />
    )
}