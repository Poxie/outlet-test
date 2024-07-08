import { CategoryWithProducts } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI"

export default function getCategoryById(id: string, options: RequestInit = {}) {
    return fetchFromAPI<CategoryWithProducts>(`/categories/${id}`, options);
}