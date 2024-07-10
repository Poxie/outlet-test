import fetchFromAPI from "../fetchFromAPI";

export default function deleteStore(id: string) {
    return fetchFromAPI(`/stores/${id}`, {
        method: 'DELETE',
    })
}