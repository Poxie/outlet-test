import { Product } from "@prisma/client";
import { PRODUCT_ID_LENGTH } from "./productConstants";
import ProductQueries from "./productQueries";
import ProductGroupQueries from "../product-groups/productGroupQueries";
import CacheInvalidator from "../cache-invalidator";

export default class ProductUtils {
    static async generateId(): Promise<string> {
        const mathOffset = 2;
        const id = Math.random().toString().slice(mathOffset, PRODUCT_ID_LENGTH + mathOffset);
        
        if(await ProductQueries.getProductById(id)) {
            return this.generateId();
        }
        
        return id;
    }
    static sortProductsByPosition(products: Product[]) {
        return products.sort((a, b) => a.position - b.position);
    }

    static getUniqueParentIds(products: Product[]) {
        const parentIds = new Set<string>();
        for(const product of products) {
            parentIds.add(product.parentId);
        }

        return Array.from(parentIds);
    }

    static async invalidateProductParentPages(productGroupId: string) {
        const productGroup = await ProductGroupQueries.getProductGroupById(productGroupId, false)

        const productPageIds: (null | string)[] = [productGroupId];
        if(productGroup) {
            productPageIds.push(productGroup.parentId);
        }

        CacheInvalidator.invalidateProductPage(productPageIds);
    }
}