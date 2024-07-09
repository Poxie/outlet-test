import { User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getUsers(options: RequestInit = {}) {
    return fetchFromAPI<User[]>('/users', options)
}