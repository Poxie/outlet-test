import { CreateCategoryProps } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createCategory(category: CreateCategoryProps) {
    return fetchFromAPI('/categories', {
        method: 'POST',
        body: JSON.stringify(category),
    })
}