import fetchFromAPI from "../fetchFromAPI";
import { WeeklyProductGroup } from "@/utils/types";

export default function getUpcomingWeekProducts(options: RequestInit = {}) {
    return fetchFromAPI<WeeklyProductGroup[]>('/weekly-products/upcoming', options);
}