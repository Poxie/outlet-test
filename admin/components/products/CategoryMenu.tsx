import { Category } from "@/utils/types"
import Menu, { MenuGroup } from "../menu";
import ViewIcon from "@/assets/icons/ViewIcon";
import BinIcon from "@/assets/icons/BinIcon";
import EditIcon from "@/assets/icons/EditIcon";
import { useModal } from "@/contexts/modal";
import DeleteCategoryModal from "@/modals/category/delete-category";
import EditCategoryModal from "@/modals/category/edit-category";

export default function CategoryMenu({ category }: {
    category: Category;
}) {
    const { setModal } = useModal();

    const openEditModal = () => setModal(<EditCategoryModal categoryId={category.id} />);
    const openDeleteModal = () => setModal(<DeleteCategoryModal category={category} />);

    const firstGroup: MenuGroup = [
        { text: 'View category', icon: <ViewIcon size={16} />, onClick: openEditModal },
        { text: 'Edit category', icon: <EditIcon size={16} />, onClick: openEditModal },
    ];
    const secondGroup: MenuGroup = [
        { text: 'Delete category', icon: <BinIcon size={16} />, type: 'danger', onClick: openDeleteModal },
    ];

    const groups: MenuGroup[] = [firstGroup, secondGroup];

    return(
        <Menu 
            groups={groups}
        />
    )
}