import { ProductPage } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getProductPage(id: string) {
    return fetchFromAPI<ProductPage>(`/product-page/${id}`);
}