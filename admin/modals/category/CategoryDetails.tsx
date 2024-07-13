import FileInput from "@/components/file-input";
import Input from "@/components/input";
import { ProductCategory } from "@/utils/types";
import { twMerge } from "tailwind-merge";

export default function CategoryDetails({ className, category, updateProps }: {
    category: ProductCategory;
    updateProps: (changes: Partial<ProductCategory>) => void;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "grid gap-3",
            className,
        )}>
            <FileInput 
                label="Banner"
                addText="Upload banner"
                value={category.bannerURL}
                onChange={bannerURL => updateProps({ bannerURL: bannerURL[0] })}
                className="aspect-[3/1.2]"
                editText="Edit banner"
                hasEditButton
            />
            <Input 
                label="Name"
                placeholder="Category name"
                value={category.title}
                onChange={title => updateProps({ title })}
            />
            <Input 
                label="Description"
                placeholder="Category description"
                value={category.description}
                onChange={description => updateProps({ description })}
                textArea
            />
        </div>
    )
}