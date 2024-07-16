import fetchFromAPI from "../fetchFromAPI";

export default function deleteCategory(categoryId: string) {
    return fetchFromAPI(`/categories/${categoryId}`, {
        method: 'DELETE',
    });
}