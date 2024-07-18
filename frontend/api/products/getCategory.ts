import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCategory(categoryId: string) {
    return fetchFromAPI<Category>(`/categories/${categoryId}?withGroups=true`);
}