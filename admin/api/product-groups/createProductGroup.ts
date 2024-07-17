import { CreateProductGroupProps, ProductGroup } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createProductGroup(productGroup: CreateProductGroupProps) {
    return fetchFromAPI<ProductGroup>('/product-groups', {
        method: 'POST',
        body: JSON.stringify(productGroup),
    })
}