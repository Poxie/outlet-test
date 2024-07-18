import { Product } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getProductsByParentId(parentId: string) {
    return fetchFromAPI<Product[]>(`/product-groups/${parentId}/products`);
}