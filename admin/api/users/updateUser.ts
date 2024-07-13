import { User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function updateUser(id: string, changes: Partial<User & {
    password: string;
}>) {
    return fetchFromAPI<User>(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    });
}