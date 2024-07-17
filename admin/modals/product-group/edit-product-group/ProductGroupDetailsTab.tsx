import useUpdateProductGroup from "@/hooks/product-groups/useUpdateProductGroup";
import ModalFooter from "@/modals/ModalFooter";
import { ProductGroup } from "@/utils/types";
import ProductGroupDetails from "../ProductGroupDetails";

export default function ProductGroupDetailsTab({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { currentProductGroup, updateProps, updateProductGroup, isPending } = useUpdateProductGroup(productGroup);

    return(
        <form onSubmit={updateProductGroup}>
            <ProductGroupDetails 
                productGroup={currentProductGroup}
                updateProps={updateProps}
            />
            
            <ModalFooter 
                confirmText="Update group"
                confirmLoadingText="Updating group..."
                loading={isPending}
            />
        </form>
    )
}