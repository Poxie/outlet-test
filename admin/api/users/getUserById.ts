import { User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getUserById(id: string, options: RequestInit = {}) {
    return fetchFromAPI<User>(`/users/${id}`, options);
}