import client from "@/client";
import ProductGroupUtils from "./productGroupUtils";
import { IncludeGroupProps } from "./productGroupConstants";

export default class ProductGroupQueries {
    // temporary function to get count, replace with relationship queries later
    static async getProductGroupProductCount(productGroupId: string) {
        const count = await client.product.count({
            where: {
                parentId: productGroupId,
            },
        });

        return count;
    }
    static async getProductGroups(withProducts?: boolean) {
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

        return group ? ProductGroupUtils.transformGroup(group) : null;
    }
    static async getProductGroupsByParentId(parentId: string) {
        const groups = await client.productGroup.findMany({
            where: {
                parentId,
            },
            ...IncludeGroupProps(),
        });
        return groups.map(ProductGroupUtils.transformGroup);
    }
    static async getUnassignedProductGroups() {
        const groups = await client.productGroup.findMany({
            where: {
                parentId: null,
            },
            ...IncludeGroupProps(),
        });
        return groups.map(ProductGroupUtils.transformGroup);
    }
}