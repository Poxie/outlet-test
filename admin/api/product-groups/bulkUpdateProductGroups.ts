import { MutableProductGroupProps, ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function bulkUpdateProductGroups(productGroups: (Partial<MutableProductGroupProps> & {
    id: string;
})[]) {
    return Promise.all(productGroups.map(productGroup => {
        const { id, ...rest } = productGroup;
        
        return fetchFromAPI<ProductGroup>(`/product-groups/${productGroup.id}`, {
            method: 'PATCH',
            body: JSON.stringify(rest),
        })
    }))
}