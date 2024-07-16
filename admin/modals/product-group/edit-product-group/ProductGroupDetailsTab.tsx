import FileInput from "@/components/file-input";
import Input from "@/components/input";
import useUpdateProductGroup from "@/hooks/product-groups/useUpdateProductGroup";
import ModalFooter from "@/modals/ModalFooter";
import { ProductGroup } from "@/utils/types";

export default function ProductGroupDetailsTab({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { currentProductGroup, updateProps, updateProductGroup, isPending } = useUpdateProductGroup(productGroup);

    const { bannerURL, name, description } = currentProductGroup;
    return(
        <form onSubmit={updateProductGroup}>
            <div className="p-4 grid gap-3">
                <FileInput 
                    label="Banner"
                    value={bannerURL}
                    onChange={bannerURL => updateProps({ bannerURL: bannerURL[0] })}
                    className="aspect-video"
                    editText="Change banner"
                    hasEditButton
                />
                <Input 
                    label="Name"
                    placeholder="Product group name..."
                    value={name}
                    onChange={name => updateProps({ name })}
                />
                <Input 
                    label="Description"
                    placeholder="Product group description..."
                    value={description}
                    onChange={description => updateProps({ description })}
                    textArea
                />
            </div>
            
            <ModalFooter 
                confirmText="Update group"
                confirmLoadingText="Updating group..."
                loading={isPending}
            />
        </form>
    )
}