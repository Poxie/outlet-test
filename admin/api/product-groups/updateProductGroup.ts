import { MutableProductGroupProps } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function updateProductGroup(productGroupId: string, data: Partial<MutableProductGroupProps>) {
    return fetchFromAPI(`/product-groups/${productGroupId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })
}