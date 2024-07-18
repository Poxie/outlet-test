import { Product } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createProducts(parentId: string, images: string[]) {
    return fetchFromAPI<Product[]>('/products', {
        method: 'POST',
        body: JSON.stringify({
            parentId,
            images,
        })
    })
}