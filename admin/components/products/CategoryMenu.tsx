import { ProductCategory } from "@/utils/types"
import Menu, { MenuGroup } from "../menu";
import MenuIcon from "@/assets/icons/MenuIcon";
import EditIcon from "@/assets/icons/EditIcon";
import ViewIcon from "@/assets/icons/ViewIcon";
import BinIcon from "@/assets/icons/BinIcon";
import { useModal } from "@/contexts/modal";
import DeleteCategoryModal from "@/modals/delete-category";
import EditCategoryModal from "@/modals/category/edit-category";

export default function CategoryMenu({ category }: {
    category: ProductCategory;
}) {
    const { setModal } = useModal();

    const openEditModal = () => setModal(<EditCategoryModal categoryId={category.id} />);
    const openDeleteModal = () => setModal(<DeleteCategoryModal category={category} />);

    const menuGroups: MenuGroup[] = [
        [
            { text: 'View category', icon: <ViewIcon size={16} />, onClick: openEditModal },
            { text: 'Edit category', icon: <EditIcon size={16} />, onClick: openEditModal },
        ],
        [
            { text: 'Delete category', icon: <BinIcon size={16} />, onClick: openDeleteModal, type: 'danger' },
        ]
    ]

    return(
        <Menu groups={menuGroups} />
    )
}