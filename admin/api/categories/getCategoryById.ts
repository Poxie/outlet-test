import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCategoryById(categoryId: string) {
    return fetchFromAPI<Category>(`/categories/${categoryId}`);
}