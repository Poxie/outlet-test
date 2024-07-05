import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCategoryWithProducts(categoryId: string) {
    return fetchFromAPI<Category>(`/categories/${categoryId}?withProducts=true`);
}