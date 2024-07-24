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

        return newProductGroup;
    }
    static async updateProductGroup(id: string, data: Partial<MutableProductGroupProps>) {
        const newProductGroup = await client.productGroup.update({
            where: {
                id,
            },
            data,
        });

        await CacheInvalidator.invalidateProductPage(id);

        return newProductGroup;
    }
    static async deleteProductGroup(id: string) {
        try {
            await client.productGroup.delete({
                where: {
                    id,
                },
            });

            await CacheInvalidator.invalidateProductPage(id);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductGroupNotFoundError();
            }
        }
    }
}