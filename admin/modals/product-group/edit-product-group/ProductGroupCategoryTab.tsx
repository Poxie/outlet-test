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
                onSelect={category => updateProps({ parentId: category.id })}
                className="p-4"
                selectText={activeCategory ? `Assign to another category` : 'Assign to a category'}
                shouldRenderAsButton
            />

            {activeCategory && (
                <ProductGroupAssignedCategory 
                    category={activeCategory}
                    updateProps={updateProps}
                    className="p-4 border-t-[1px] border-t-tertiary"
                />
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