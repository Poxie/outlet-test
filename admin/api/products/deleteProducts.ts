import fetchFromAPI from "../fetchFromAPI";

export default function deleteProducts(parentId: string, productIds: string[]) {
    return fetchFromAPI('/products', {
        method: 'DELETE',
        body: JSON.stringify({ productIds, parentId }),
    })
}