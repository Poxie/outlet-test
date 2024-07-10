import { Store } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getStoreById(id: string, options: RequestInit = {}) {
    return fetchFromAPI<Store>(`/stores/${id}`, options);
}