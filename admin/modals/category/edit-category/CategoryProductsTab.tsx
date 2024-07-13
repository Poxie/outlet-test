import { CategoryWithProducts } from "@/utils/types";
import CategoryProducts from "../CategoryProducts";
import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import ModalFooter from "@/modals/ModalFooter";

export default function CategoryProductsTab({ category }: {
    category: CategoryWithProducts;
}) {
    const { currentCategory, updateProps, updateCategory, isPending } = useUpdateCategory(category);

    return(
        <form onSubmit={updateCategory}>
            <CategoryProducts 
                category={currentCategory}
                updateProps={updateProps}
                className="p-4"
            />

            <ModalFooter 
                confirmText="Save products"
                confirmLoadingText="Saving products..."
                loading={isPending}
            />
        </form>
    )
}