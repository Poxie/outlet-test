import { ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getProductGroup(productGroupId: string) {
    return fetchFromAPI<ProductGroup>(`/product-groups/${productGroupId}?withProducts=true`);
}