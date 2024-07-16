import client from "@/client";

export default class ProductGroupQueries {
    // temporary function to get count, replace with relationship queries later
    static async getProductGroupProductCount(productGroupId: string) {
        const count = await client.product.count({
            where: {
                parentId: productGroupId,
            }
        });

        return count;
    }
    static async getProductGroups() {
        const groups = await client.productGroup.findMany();
        
        const groupsWithProductCounts = await Promise.all(
            groups.map(async group => {
                const productCount = await this.getProductGroupProductCount(group.id);
                return {
                    ...group,
                    productCount,
                };
            })
        );

        return groupsWithProductCounts;
    }
    static async getProductGroupById(id: string) {
        return client.productGroup.findUnique({
            where: {
                id,
            }
        });
    }
    static async getProductGroupsByParentId(parentId: string) {
        return client.productGroup.findMany({
            where: {
                parentId,
            }
        });
    }
    static async getUnassignedProductGroups() {
        return client.productGroup.findMany({
            where: {
                parentId: null,
            }
        });
    }
}