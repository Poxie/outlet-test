import fetchFromAPI from "../fetchFromAPI";

export default function removeWeeklyProducts(productIds: string[]) {
    return fetchFromAPI(`/weekly-products`, {
        method: 'DELETE',
        body: JSON.stringify({ productIds }),
    })
}