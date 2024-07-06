import { WeeklyProduct } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentWeeksProducts() {
    return fetchFromAPI<WeeklyProduct[]>('/weekly-products');
}