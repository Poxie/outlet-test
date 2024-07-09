import fetchFromAPI from "../fetchFromAPI";

export default function deleteCategory(id: string) {
    return fetchFromAPI(`/categories/${id}`, {
        method: 'DELETE',
    })
}