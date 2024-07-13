import { CategoryWithProducts } from "@/utils/types";
import CategoryDetails from "../CategoryDetails";
import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import ModalFooter from "@/modals/ModalFooter";

export default function CategoryDetailsTab({ category }: {
    category: CategoryWithProducts;
}) {
    const { currentCategory, updateProps, updateCategory, isPending } = useUpdateCategory(category);

    return(
        <form onSubmit={updateCategory}>
            <CategoryDetails 
                category={currentCategory}
                updateProps={updateProps}
                className="p-4"
            />
            <ModalFooter 
                loading={isPending}
                confirmText="Save changes"
                confirmLoadingText="Saving changes..."
            />
        </form>
    )
}