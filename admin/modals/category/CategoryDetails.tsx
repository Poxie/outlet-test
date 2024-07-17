import FileInput from "@/components/file-input";
import Input from "@/components/input";
import { Category } from "@/utils/types";

export default function CategoryDetails({ category, updateProps }: {
    category: Category;
    updateProps: (props: Partial<Category>) => void;
}) {
    const { title, description, bannerURL } = category;
    return(
        <div className="p-4 grid gap-3">
            <FileInput 
                label="Banner"
                value={bannerURL}
                onChange={banner => updateProps({ bannerURL: banner[0] })}
                addText="Add banner"
                className="aspect-video"
                editText="Change banner"
                hasEditButton
            />
            <Input 
                label="Title"
                placeholder="Category title..."
                value={title}
                onChange={title => updateProps({ title })}
            />
            <Input 
                label="Description"
                placeholder="Category description..."
                value={description}
                onChange={description => updateProps({ description })}
                textArea
            />
        </div>
    )
}