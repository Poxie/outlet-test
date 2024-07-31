import { useFeedback } from "@/contexts/feedback";
import { useModal } from "@/contexts/modal";
import useMutateDeleteProductGroup from "@/hooks/product-groups/useMutateDeleteProductGroup";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ConfirmModal from "@/modals/confirm";
import { ProductGroup } from "@/utils/types";

export default function DeleteProductGroup({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateDeleteProductGroup(productGroup.id);

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const deleteProductGroup = async () => {
        try {
            await mutateAsync();

            setFeedback({
                message: 'Product group deleted successfully',
                type: 'success',
            });

            if(productGroup.groupType === 'BLOG') {
                refetchQuery(['blog-posts']);
            } else {
                refetchQuery(['product-groups']);
            }
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
            title={`Delete ${productGroup.name}`}
            confirmText="Delete group"
            confirmLoadingText="Deleting group..."
            message="Are you sure you want to delete this product group? All products in this group will be deleted as well."
            onConfirm={deleteProductGroup}
            loading={isPending}
        />
    )
}