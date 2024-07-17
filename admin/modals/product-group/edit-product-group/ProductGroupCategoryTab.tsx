import CloseIcon from "@/assets/icons/CloseIcon";
import GenericDropdown from "@/components/generic-dropdown";
import CategoryDetails from "@/components/products/CategoryDetails";
import useGetAllCategories from "@/hooks/categories/useGetAllCategories";
import useUpdateProductGroup from "@/hooks/product-groups/useUpdateProductGroup";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";
import ModalFooter from "@/modals/ModalFooter";
import { Category, ProductGroup } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductGroupAssignedCategory from "./ProductGroupAssignedCategory";

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
    
    const renderItem = (category: Category) => {
        return(
            <div 
                key={category.id}
                className="flex items-center justify-between gap-4"
            >
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                        {category.title}
                    </span>
                    <span className="text-xs text-muted line-clamp-2">
                        {category.description}
                    </span>
                </div>
                <Image 
                    className="aspect-video rounded object-cover"
                    src={category.bannerURL}
                    width={90}
                    height={58}
                    alt=""
                />
            </div>
        )
    }

    const activeCategory = categories.find(category => category.id === currentProductGroup.parentId);
    return(
        <form onSubmit={updateCategory}>
            <GenericDropdown 
                items={categories}
                renderItem={renderItem}
                selectText="Select a category..."
                onSelect={category => updateProps({ parentId: category.id })}
                searchPlaceholder="Search category..."
                searchKeys={['title']}
                label="Assign category"
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