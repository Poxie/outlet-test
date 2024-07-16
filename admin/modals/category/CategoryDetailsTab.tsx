import FileInput from "@/components/file-input";
import Input from "@/components/input";
import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import { Category } from "@/utils/types"
import ModalFooter from "../ModalFooter";

export default function CategoryDetailsTab({ category }: {
    category: Category;
}) {
    const { currentCategory, updateProps, updateCategory, isPending } = useUpdateCategory(category);

    const { title, description, bannerURL } = currentCategory;
    return(
        <>
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
        <ModalFooter 
            onConfirm={updateCategory}
            confirmText="Update category"
            loading={isPending}
            closeOnCancel
        />
        </>
    )
}