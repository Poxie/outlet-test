import client from "@/client";

export default class ProductQueries {
    static async getProductsByParentId(parentId: string) {
        const products = await client.product.findMany({
            where: {
                parentId,
            }
        });

        return products;
    }

    static async getProductById(id: string) {
        const product = await client.product.findUnique({
            where: {
                id,
            }
        });

        return product;
    }

    static async getProductsByPositionGreaterThan(position: number) {
        const products = await client.product.findMany({
            where: {
                position: {
                    gt: position,
                }
            }
        });

        return products;
    }
}