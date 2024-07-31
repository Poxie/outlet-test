import { ProductGroup } from "@/utils/types";
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { useModal } from "@/contexts/modal"
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import EditProductGroup from "@/modals/product-group/edit-product-group";
import getProductGroupById from "@/api/product-groups/getProductGroupById";
import DeleteProductGroup from "@/modals/product-group/delete-product-group";

export default function BlogMenu({ productGroup }: { 
    productGroup: ProductGroup; 
}) {
    const { setModal } = useModal();

    const isAdmin = useSelfIsAdmin();

    const openEditModal = () => setModal(<EditProductGroup productGroupId={productGroup.id} />);
    const openDeleteModal = () => setModal(<DeleteProductGroup productGroup={productGroup} />);

    const firstGroup: MenuGroup = [
        { text: 'View blog post', icon: <ViewIcon size={16} />, onClick: openEditModal },
    ];
    const secondGroup: MenuGroup = [];

    if(isAdmin) {
        firstGroup.push({
            text: 'Edit blog post',
            icon: <EditIcon size={16} />,
            onClick: openEditModal,
        })
        secondGroup.push({
            text: 'Delete blog post',
            icon: <BinIcon size={16} />,
            type: 'danger',
            onClick: openDeleteModal,
        })
    }

    const menuGroups: MenuGroup[] = [firstGroup];
    if(secondGroup.length) menuGroups.push(secondGroup);

    return(
        <Menu 
            groups={menuGroups}
            prefetchQueryFn={() => getProductGroupById(productGroup.id)}
            prefetchQueryKey={['product-groups', productGroup.id]}
        />
    )
}