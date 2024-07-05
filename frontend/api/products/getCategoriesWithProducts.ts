import { Category } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getCategoriesWithProducts() {
    return fetchFromAPI<Category[]>('/categories?withProducts=true')
}