import useGetAllProductGroups from "@/hooks/product-groups/useGetAllProductGroups";
import { Category, ProductGroup } from "@/utils/types";
import CategoryProductGroup from "./CategoryProductGroup";
import ProductGroupDropdown from "@/components/product-group-dropdown";
import ModalFooter from "@/modals/ModalFooter";
import { useEffect, useRef, useState } from "react";
import useChanges from "@/hooks/useChanges";
import { useFeedback } from "@/contexts/feedback";
import useMutateBulkUpdateProductGroups from "@/hooks/product-groups/useMutateBulkUpdateProductGroups";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

export default function CategoryProductGroupsTab({ category }: {
    category: Category;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateBulkUpdateProductGroups();

    const { data: productGroups } = useGetAllProductGroups();

    const initialGroups = useRef<ProductGroup[]>([]);
    const [activeGroups, setActiveGroups] = useState<ProductGroup[]>([]);

    const { setFeedback } = useFeedback();
    useEffect(() => {
        if(!productGroups) return;

        const activeGroups = productGroups.filter(group => group.parentId === category.id);

        initialGroups.current = activeGroups;
        setActiveGroups(activeGroups);
    }, [productGroups]);

    if(!productGroups) return null;

    const updateGroups = async (e: React.FormEvent) => {
        e.preventDefault();

        const previousGroups = initialGroups.current;
        const currentGroups = activeGroups;

        const previousIds = previousGroups.map(group => group.id);
        const currentIds = currentGroups.map(group => group.id);

        const newGroups = currentGroups.filter(group => !previousIds.includes(group.id));
        const removedGroups = previousGroups.filter(group => !currentIds.includes(group.id));

        if(newGroups.length === 0 && removedGroups.length === 0) {
            setFeedback({
                message: 'No changes detected',
                type: 'danger',
            })
            return;
        }

        const newGroupsData = newGroups.map(group => ({ id: group.id, parentId: category.id }));
        const removedGroupsData = removedGroups.map(group => ({ id: group.id, parentId: null }));

        try {
            const groupsToUpdate = [];
            if(newGroups.length > 0) groupsToUpdate.push(...newGroupsData);
            if(removedGroups.length > 0) groupsToUpdate.push(...removedGroupsData);

            await mutateAsync(groupsToUpdate);

            setFeedback({
                message: 'Product groups updated',
                type: 'success',
            })

            refetchQuery(['categories']);
            refetchQuery(['product-groups']);
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    const handleAddProductGroup = (productGroup: ProductGroup) => {
        setActiveGroups(prev => {
            // If it already exists, don't add it again
            if(prev.map(group => group.id).includes(productGroup.id)) return prev;
            
            return [productGroup, ...prev];
        });
    }
    const handleRemoveProductGroup = (productGroup: ProductGroup) => {
        setActiveGroups(prev => prev.filter(group => group.id !== productGroup.id));
    }

    const hasActiveGroups = activeGroups.length > 0;
    return(
        <form onSubmit={updateGroups}>
            <ProductGroupDropdown 
                onSelect={handleAddProductGroup}
                className="p-4 border-b-[1px] border-b-tertiary"
                label="Assign product group"
            />

            <div className="p-4">
                {hasActiveGroups && (
                    <>
                    <span className="mb-2 block text-sm font-medium">
                        Assigned product groups
                    </span>
                    <div className="grid gap-1">
                        {activeGroups.map(group => (
                            <CategoryProductGroup 
                                onRemove={handleRemoveProductGroup}
                                productGroup={group}
                                key={group.id} 
                            />
                        ))}
                    </div>
                    </>
                )}
                {!hasActiveGroups && (
                    <span className="block w-full text-sm text-center">
                        This category has no assigned product groups.
                    </span>
                )}
            </div>

            <ModalFooter 
                confirmText="Update groups"
                confirmLoadingText="Updating groups..."
                loading={isPending}
                closeOnCancel
            />
        </form>
    )
}