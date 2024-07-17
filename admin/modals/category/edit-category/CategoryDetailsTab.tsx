import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import ModalFooter from "@/modals/ModalFooter";
import { Category } from "@/utils/types"
import CategoryDetails from "../CategoryDetails";

export default function CategoryDetailsTab({ category }: {
    category: Category;
}) {
    const { currentCategory, updateProps, updateCategory, isPending } = useUpdateCategory(category);

    return(
        <form onSubmit={updateCategory}>
            <CategoryDetails 
                category={currentCategory} 
                updateProps={updateProps}
            />
            <ModalFooter 
                confirmText="Update category"
                confirmLoadingText="Updating category..."
                loading={isPending}
                closeOnCancel
            />
        </form>
    )
}