import useCreateProductGroup from "@/hooks/product-groups/useCreateProductGroup";
import ModalFooter from "@/modals/ModalFooter";
import ModalHeader from "@/modals/ModalHeader";
import ProductGroupDetails from "../ProductGroupDetails";
import { ProductGroupType } from "@/utils/types";

export default function CreateProductGroup({ groupType, title="Add product group" }: {
    groupType?: ProductGroupType;
    title?: string
}) {
    const { currentProductGroup, updateProps, createProductGroup, isPending } = useCreateProductGroup({ groupType });

    return(
        <>
        <ModalHeader 
            title={title}
        />
        <form onSubmit={createProductGroup}>
            <ProductGroupDetails 
                productGroup={currentProductGroup}
                updateProps={updateProps}
            />

            <ModalFooter 
                confirmText="Add group"
                confirmLoadingText="Adding group..."
                loading={isPending}
            />
        </form>
        </>
    )
}