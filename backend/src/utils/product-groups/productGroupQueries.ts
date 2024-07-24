import client from "@/client";
import ProductGroupUtils from "./productGroupUtils";
import { IncludeGroupProps } from "./productGroupConstants";
import REDIS_KEYS from "../redis/redisKeys";
import RedisHandler from "../redis/redisHandler";
import REDIS_TAGS from "../redis/redisTags";
import { ProductGroup } from "@prisma/client";

export default class ProductGroupQueries {
    static async getProductGroups(withProducts = false) {
        const groups = await client.productGroup.findMany(
            IncludeGroupProps({ products: withProducts })
        );
        
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);
        
        return groupsWithCounts;
    }
    static async getProductGroupById(id: string, withProducts = false) {
        const group = await client.productGroup.findUnique({
            where: {
                id,
            },
            ...IncludeGroupProps({ products: withProducts }),
        });
        if(!group) return null;

        const groupWithCount = ProductGroupUtils.transformGroup(group);

        return groupWithCount;
    }
    static async getProductGroupsByParentId(parentId: string) {
        const groups = await client.productGroup.findMany({
            where: {
                parentId,
            },
            ...IncludeGroupProps(),
        });
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        return groupsWithCounts;
    }
}