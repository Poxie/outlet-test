import { Category, MutableCategoryProps } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function updateCategory(categoryId: string, changes: Partial<MutableCategoryProps>) {
    return fetchFromAPI<Category>(`/categories/${categoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    })
}