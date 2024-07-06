import fetchFromAPI from "../fetchFromAPI";
import { WeeklyProductGroup } from "@/utils/types";

export default function getAllWeekProducts(options: RequestInit = {}) {
    return fetchFromAPI<WeeklyProductGroup[]>('/weekly-products', options);
}