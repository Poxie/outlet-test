import bulkUpdateProductGroups from "@/api/product-groups/bulkUpdateProductGroups";
import { MutableProductGroupProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateBulkUpdateProductGroups() {
    return useMutation({
        mutationKey: ['product-groups', 'bulk-update'],
        mutationFn: (productGroups: (Partial<MutableProductGroupProps> & {
            id: string;
        })[]) => bulkUpdateProductGroups(productGroups)
    })
}