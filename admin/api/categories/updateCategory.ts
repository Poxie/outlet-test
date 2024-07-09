import { ProductCategory } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function updateCategory(categoryId: string, changes: Partial<ProductCategory>) {
    return fetchFromAPI<ProductCategory>(`/categories/${categoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    })
}