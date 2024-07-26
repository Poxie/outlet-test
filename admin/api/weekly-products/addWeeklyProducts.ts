import { WeeklyProduct } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";
import { PRODUCT_TYPES } from "@/utils/constants";

export default function addWeeklyProducts(date: string, images: string[]) {
    return fetchFromAPI<WeeklyProduct[]>(`/products`, {
        method: 'POST',
        body: JSON.stringify({ 
            parentId: date,
            images,
            parentType: PRODUCT_TYPES.WEEKLY_PRODUCT, 
        }),
    });
}