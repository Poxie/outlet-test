import client from "@/client";
import { ProductGroup } from "@prisma/client";
import { MutableProductGroupProps } from "../types";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductGroupNotFoundError } from "./productGroupErrors";
import CacheInvalidator from "../cache-invalidator";

export default class ProductGroupMutations {
    static async createProductGroup(data: ProductGroup) {
        const newProductGroup = await client.productGroup.create({
            data,
        });

        await CacheInvalidator.invalidateProductList();

        return newProductGroup;
    }
    static async updateProductGroup(id: string, data: Partial<MutableProductGroupProps>) {
        const newProductGroup = await client.productGroup.update({
            where: {
                id,
            },
            data,
        });

        await CacheInvalidator.invalidateProductPage([id, newProductGroup.parentId]);

        return newProductGroup;
    }
    static async deleteProductGroup(id: string) {
        try {
            const removedProductGroup = await client.productGroup.delete({
                where: {
                    id,
                },
            });

            await CacheInvalidator.invalidateProductPage([id, removedProductGroup.parentId]);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductGroupNotFoundError();
            }
        }
    }
}