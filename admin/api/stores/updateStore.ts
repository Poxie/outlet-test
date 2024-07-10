import { MutableStoreProps } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function updateStore(id: string, changes: Partial<MutableStoreProps>) {
    return fetchFromAPI(`/stores/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    })
}