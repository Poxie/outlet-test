import fetchFromAPI from "../fetchFromAPI";
import { WeeklyProductGroup } from "@/utils/types";

export default function getUpcomingWeekProducts() {
    return fetchFromAPI<WeeklyProductGroup[]>('/weekly-products/upcoming');
}