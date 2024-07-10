import { Store } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getStores() {
    return fetchFromAPI<Store[]>('/stores');
}