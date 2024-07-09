import fetchFromAPI from "../fetchFromAPI";

export default function deleteCategoryProducts(categoryId: string, productIds: string[]) {
    return fetchFromAPI(`/products`, {
        method: 'DELETE',
        body: JSON.stringify({
            parentId: categoryId,
            productIds,
        })
    })
}