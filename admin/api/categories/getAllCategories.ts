import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getAllCategories(options: RequestInit = {}) {
    return fetchFromAPI<Category[]>('/categories', options);
}