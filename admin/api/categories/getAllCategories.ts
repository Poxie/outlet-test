import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getAllCategories() {
    return fetchFromAPI<Category[]>('/categories');
}