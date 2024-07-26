import { WeeklyProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getWeeklyProductsByDate(date: string) {
    return fetchFromAPI<WeeklyProductGroup>(`/weekly-products/${date}`);
}