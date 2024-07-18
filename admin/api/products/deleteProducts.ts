import fetchFromAPI from "../fetchFromAPI";

export default function deleteProducts(productIds: string[]) {
    return fetchFromAPI('/products', {
        method: 'DELETE',
        body: JSON.stringify({ productIds }),
    })
}