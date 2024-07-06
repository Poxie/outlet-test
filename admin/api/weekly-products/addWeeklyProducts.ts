import { WeeklyProduct } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function addWeeklyProducts(date: string, images: string[]) {
    return fetchFromAPI<WeeklyProduct[]>(`/weekly-products/${date}`, {
        method: 'POST',
        body: JSON.stringify({ date, images }),
    });
}