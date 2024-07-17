import useCreateProductGroup from "@/hooks/product-groups/useCreateProductGroup";
import ModalFooter from "@/modals/ModalFooter";
import ModalHeader from "@/modals/ModalHeader";
import { getEmptyProductGroupObject } from "@/utils";
import ProductGroupDetails from "../ProductGroupDetails";

const initialProductGroup = getEmptyProductGroupObject();
export default function CreateProductGroup() {
    const { currentProductGroup, updateProps, createProductGroup, isPending } = useCreateProductGroup();

    return(
        <>
        <ModalHeader 
            title="Add product group"
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