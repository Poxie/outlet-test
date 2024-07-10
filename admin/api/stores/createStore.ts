import { CreateStoreProps, Store } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createStore(data: CreateStoreProps) {
    return fetchFromAPI<Store>(`/stores`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}