import { ProductListItem } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getHomeProductList() {
    return fetchFromAPI<ProductListItem[]>('/product-list');
}