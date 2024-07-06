import { WeeklyProduct } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentWeekProducts() {
    return fetchFromAPI<WeeklyProduct[]>('/weekly-products');
}