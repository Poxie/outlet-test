import { ProductCategory } from "@/utils/types";
import ConfirmModal from "../confirm";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import useMutateDeleteCategory from "@/hooks/categories/useMutateDeleteCategory";

export default function DeleteCategoryModal({ category }: {
    category: ProductCategory;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateDeleteCategory(category.id);

    const { closeModal } = useModal();

    const deleteCategory = async () => {
        await mutateAsync();
        refetchQuery(['categories', 'with-counts']);
        closeModal();
    }

    const title = `Delete ${category.title}`;
    const message= "Are you sure you want to delete this category? All products in this category will be deleted as well. This action cannot be undone."
    return(
        <ConfirmModal 
            title={title}
            message={message}
            confirmText="Delete category"
            confirmLoadingText="Deleting category..."
            onConfirm={deleteCategory}
            loading={isPending}
        />
    )
}