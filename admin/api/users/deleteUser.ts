import fetchFromAPI from "../fetchFromAPI";

export default function deleteUser(id: string) {
    return fetchFromAPI(`/users/${id}`, {
        method: 'DELETE',
    });
}