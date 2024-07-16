import { ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getProductGroupById(productGroupId: string) {
    return fetchFromAPI<ProductGroup>(`/product-groups/${productGroupId}`);
}