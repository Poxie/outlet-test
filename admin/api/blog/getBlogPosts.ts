import { ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getBlogPosts() {
    return fetchFromAPI<ProductGroup[]>('/product-groups?groupType=BLOG');
}