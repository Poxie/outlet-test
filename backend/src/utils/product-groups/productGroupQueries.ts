import client from "@/client";
import ProductGroupUtils from "./productGroupUtils";
import { IncludeGroupProps } from "./productGroupConstants";
import REDIS_KEYS from "../redis/redisKeys";
import RedisHandler from "../redis/redisHandler";
import REDIS_TAGS from "../redis/redisTags";
import { ProductGroup } from "@prisma/client";

export default class ProductGroupQueries {
    static async getProductGroups(withProducts = false) {
        const cacheKey = REDIS_KEYS.productGroups(withProducts);

        const redisGroups = await RedisHandler.get<ProductGroup[]>(cacheKey);
        if(redisGroups) return redisGroups;

        const groups = await client.productGroup.findMany(
            IncludeGroupProps({ products: withProducts })
        );
        
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        await RedisHandler.set(cacheKey, groupsWithCounts, REDIS_TAGS.productGroups);

        return groupsWithCounts;
    }
    static async getProductGroupById(id: string, withProducts = false) {
        const cacheKey = REDIS_KEYS.productGroup(id, withProducts);

        const redisGroup = await RedisHandler.get<ProductGroup>(cacheKey);
        if(redisGroup) return redisGroup;

        const group = await client.productGroup.findUnique({
            where: {
                id,
            },
            ...IncludeGroupProps({ products: withProducts }),
        });
        if(!group) return null;

        const groupWithCount = ProductGroupUtils.transformGroup(group);

        await RedisHandler.set(cacheKey, groupWithCount, REDIS_TAGS.productGroups);

        return groupWithCount;
    }
    static async getProductGroupsByParentId(parentId: string) {
        const cacheKey = REDIS_KEYS.productGroupsByParentId(parentId);

        const redisGroups = await RedisHandler.get<ProductGroup[]>(cacheKey);
        if(redisGroups) return redisGroups;

        const groups = await client.productGroup.findMany({
            where: {
                parentId,
            },
            ...IncludeGroupProps(),
        });
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        await RedisHandler.set(cacheKey, groupsWithCounts, REDIS_TAGS.productGroups);

        return groupsWithCounts;
    }
    static async getUnassignedProductGroups() {
        const cacheKey = REDIS_KEYS.productGroupsByParentId(null);

        const redisGroups = await RedisHandler.get(cacheKey);
        if(redisGroups) return redisGroups;

        const groups = await client.productGroup.findMany({
            where: {
                parentId: null,
            },
            ...IncludeGroupProps(),
        });
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        await RedisHandler.set(cacheKey, groupsWithCounts, REDIS_TAGS.productGroups);

        return groupsWithCounts;
    }
}