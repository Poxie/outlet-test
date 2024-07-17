import useGetAllCategories from "@/hooks/categories/useGetAllCategories";
import useUpdateProductGroup from "@/hooks/product-groups/useUpdateProductGroup";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ModalFooter from "@/modals/ModalFooter";
import { ProductGroup } from "@/utils/types";
import ProductGroupAssignedCategory from "./ProductGroupAssignedCategory";
import CategoryDropdown from "@/components/category-dropdown";

export default function ProductGroupCategoryTab({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const refetchQuery = useRefetchQuery();

    const { data: categories } = useGetAllCategories();

    const { currentProductGroup, updateProps, updateProductGroup, isPending } = useUpdateProductGroup(productGroup);

    if(!categories) return null;

    const updateCategory = async (e: React.FormEvent) => {
        await updateProductGroup(e);
        refetchQuery(['categories']);
    }

    const activeCategory = categories.find(category => category.id === currentProductGroup.parentId);
    return(
        <form onSubmit={updateCategory}>
            <CategoryDropdown 
                label="Assign category"
                onSelect={category => updateProps({ parentId: category.id })}
                className="p-4 border-b-[1px] border-b-tertiary"
            />

            {activeCategory && (
                <div className="p-4">
                    <span className="block mb-2 text-sm font-medium">
                        Assigned category
                    </span>
                    <ProductGroupAssignedCategory 
                        category={activeCategory}
                        updateProps={updateProps}
                    />
                </div>
            )}
            {!activeCategory && (
                <span className="m-4 block text-sm text-center text-muted">
                    This group is not assigned to any category.
                </span>
            )}

            <ModalFooter 
                confirmText="Update category"
                confirmLoadingText="Updating category..."
                loading={isPending}
                closeOnCancel
            />
        </form>
    )
}