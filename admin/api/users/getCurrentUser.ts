import { User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentUser(options: RequestInit = {}) {
    return fetchFromAPI<User>('/users/me', options);
}