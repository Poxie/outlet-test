import fetchFromAPI from "../fetchFromAPI";

export default function deleteProductGroup(productGroupId: string) {
    return fetchFromAPI(`/product-groups/${productGroupId}`, {
        method: 'DELETE',
    })
}