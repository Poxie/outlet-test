import { WeeklyGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCurrentWeeksProducts() {
    return fetchFromAPI<WeeklyGroup>('/weekly-products/current');
}