import client from "@/client";
import ProductGroupUtils from "./productGroupUtils";
import { IncludeGroupProps, PRODUCT_GROUP_TYPE } from "./productGroupConstants";
import { ProductGroup } from "@prisma/client";
import { ProductGroupType, ProductGroupWithProducts } from "../types";

export default class ProductGroupQueries {
    static async getProductGroups(withProducts = false, groupType?: ProductGroupType) {
        const groups = await client.productGroup.findMany({
            where: {
                groupType: groupType || PRODUCT_GROUP_TYPE.PRODUCT_GROUP,
            },
            ...IncludeGroupProps({ products: withProducts })
        });
        
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);
        
        return groupsWithCounts;
    }

    static async getProductGroupsByIds(id: string[], withProducts: false): Promise<ProductGroup[]>;
    static async getProductGroupsByIds(id: string[], withProducts: true): Promise<ProductGroupWithProducts[]>;
    static async getProductGroupsByIds(ids: string[], withProducts = false): Promise<
        ProductGroup[] | ProductGroupWithProducts[]
    > {
        const groups = await client.productGroup.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            ...IncludeGroupProps({ products: withProducts }),
        });

        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        return groupsWithCounts;
    }

    static async getProductGroupById(id: string, withProducts: false, groupType?: ProductGroupType): Promise<ProductGroup | null>;
    static async getProductGroupById(id: string, withProducts: true, groupType?: ProductGroupType): Promise<ProductGroupWithProducts | null>;
    static async getProductGroupById(id: string, withProducts: boolean, groupType?: ProductGroupType): Promise<
        ProductGroup | ProductGroupWithProducts | null
    > {
        const group = await client.productGroup.findUnique({
            where: {
                id,
                groupType,
            },
            ...IncludeGroupProps({ products: withProducts }),
        });
        if(!group) return null;

        const groupWithCount = ProductGroupUtils.transformGroup(group);

        return groupWithCount;
    }

    static async getProductGroupsByParentId(parentId: string): Promise<ProductGroupWithProducts[]>;
    static async getProductGroupsByParentId(parentId: string) {
        const groups = await client.productGroup.findMany({
            where: {
                groupType: PRODUCT_GROUP_TYPE.PRODUCT_GROUP,
                parentId,
            },
            ...IncludeGroupProps({ products: true }),
        });
        const groupsWithCounts = groups.map(ProductGroupUtils.transformGroup);

        return groupsWithCounts;
    }
}