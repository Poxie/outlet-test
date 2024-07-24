import client from "@/client";
import { ProductGroup } from "@prisma/client";
import { MutableProductGroupProps } from "../types";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductGroupNotFoundError } from "./productGroupErrors";
import RedisHandler from "../redis/redisHandler";
import REDIS_TAGS from "../redis/redisTags";

export default class ProductGroupMutations {
    static async createProductGroup(data: ProductGroup) {
        const newProductGroup = await client.productGroup.create({
            data,
        });

        await RedisHandler.invalidateTags(REDIS_TAGS.productGroups);

        return newProductGroup;
    }
    static async updateProductGroup(id: string, data: Partial<MutableProductGroupProps>) {
        const newProductGroup = await client.productGroup.update({
            where: {
                id,
            },
            data,
        });

        await RedisHandler.invalidateTags(REDIS_TAGS.productGroups);

        return newProductGroup;
    }
    static async deleteProductGroup(id: string) {
        try {
            await client.productGroup.delete({
                where: {
                    id,
                },
            });

            await RedisHandler.invalidateTags(REDIS_TAGS.productGroups);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductGroupNotFoundError();
            }
        }
    }
}