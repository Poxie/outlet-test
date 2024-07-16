import { useFeedback } from "@/contexts/feedback";
import { useModal } from "@/contexts/modal";
import useMutateDeleteCategory from "@/hooks/categories/useMutateDeleteCategory";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ConfirmModal from "@/modals/confirm";
import { Category } from "@/utils/types";

export default function DeleteCategoryModal({ category }: {
    category: Category;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateDeleteCategory(category.id);

    const { closeModal }  = useModal();
    const { setFeedback } = useFeedback();

    const onConfirm = async () => {
        try {
            await mutateAsync();

            setFeedback({
                message: 'Category deleted successfully',
                type: 'success',
            })
            
            refetchQuery(['categories']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return(
        <ConfirmModal 
            title={`Delete ${category.title}`}
            message="Are you sure you want to delete this category? This action cannot be undone."
            confirmText="Delete category"
            cancelText="Cancel"
            onConfirm={onConfirm}
            loading={isPending}
        />
    )
}