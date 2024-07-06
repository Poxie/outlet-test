import { WeeklyProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getProductsByDate(date: string, options: RequestInit = {}) {
    return fetchFromAPI<WeeklyProductGroup>(`/weekly-products/${date}`, options);
}