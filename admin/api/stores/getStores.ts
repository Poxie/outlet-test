import { Store } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getStores(options: RequestInit = {}) {
    return fetchFromAPI<Store[]>('/stores', options);
}