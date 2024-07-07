import { ProductCategory } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCategoriesWithProductCounts(options: RequestInit = {}) {
    return fetchFromAPI<ProductCategory[]>('/categories?withProductCounts=true', options)
}