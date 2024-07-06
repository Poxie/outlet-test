import { WeeklyProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentWeekProducts() {
    return fetchFromAPI<WeeklyProductGroup>('/weekly-products/current');
}