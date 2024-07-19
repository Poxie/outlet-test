import { ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getAllProductGroups(options: RequestInit = {}) {
    return fetchFromAPI<ProductGroup[]>('/product-groups', options);
}