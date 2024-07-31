import FileInput from "@/components/file-input";
import Input from "@/components/input";
import { ProductGroup } from "@/utils/types";

export default function ProductGroupDetails({ productGroup, updateProps }: {
    productGroup: ProductGroup;
    updateProps: (changes: Partial<ProductGroup>) => void;
}) {
    const { bannerURL, name, description } = productGroup;

    return(
        <div className="p-4 grid gap-3">
            <FileInput 
                label="Banner"
                value={bannerURL}
                addText="Add banner"
                onChange={bannerURL => updateProps({ bannerURL: bannerURL[0] })}
                defaultImage={productGroup.groupType === 'BLOG' ? (
                    process.env.NEXT_PUBLIC_BLOG_BANNER_URL
                ) : undefined}
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
    )
}