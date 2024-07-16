import { ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getAllProductGroups() {
    return fetchFromAPI<ProductGroup[]>('/product-groups');
}