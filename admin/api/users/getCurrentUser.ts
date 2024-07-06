import { User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentUser() {
    return fetchFromAPI<User>('/users/me');
}