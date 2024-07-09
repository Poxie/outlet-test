import { MutableCategoryProps, ProductCategory } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createCategory(category: MutableCategoryProps) {
    return fetchFromAPI<ProductCategory>(`/categories`, {
        method: 'POST',
        body: JSON.stringify(category),
    });
}