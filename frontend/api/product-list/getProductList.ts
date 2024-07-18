import { ProductListItem } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default async function getProductList() {
    return fetchFromAPI<ProductListItem[]>('/product-list');
}