import { ProductCategory } from "@/utils/types";
import ConfirmModal from "../confirm";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import useMutateDeleteCategory from "@/hooks/categories/useMutateDeleteCategory";
import { useFeedback } from "@/contexts/feedback";

export default function DeleteCategoryModal({ category }: {
    category: ProductCategory;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateDeleteCategory(category.id);
    
    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const deleteCategory = async () => {
        try {
            await mutateAsync();

            setFeedback({
                type: 'success',
                message: 'Category has been deleted',
            })

            refetchQuery(['categories', 'with-counts']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
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