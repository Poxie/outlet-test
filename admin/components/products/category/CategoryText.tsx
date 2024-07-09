import Input from "@/components/input";
import { CategoryWithProducts } from "@/utils/types";

export default function CategoryText({ category, updateProps }: {
    category: CategoryWithProducts;
    updateProps: (changes: Partial<CategoryWithProducts>) => void;
}) {
    return(
        <>
        <Input 
            label="Category name"
            placeholder="Category name"
            value={category.title}
            onChange={title => updateProps({ title })}
        />
        <Input 
            containerClassName="mt-3"
            label="Category description"
            placeholder="Category description"
            value={category.description}
            onChange={description => updateProps({ description })}
            textArea
        />
        </>
    )
}