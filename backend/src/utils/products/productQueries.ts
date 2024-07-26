import client from "@/client";
import { ProductNotFoundError } from "./productErrors";

export default class ProductQueries {
    static async getProductCountByGroupId(groupId: string) {
        const count = await client.product.count({
            where: {
                id: groupId,
            },
        });

        return count;
    }
    
    static async bulkGetProductsById(ids: string[]) {
        const products = await client.product.findMany({
            where: {
                id: {
                    in: ids,
                }
            }
        });
        if(products.length !== ids.length) {
            throw new ProductNotFoundError();
        }

        return products;
    }

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

    static async getProductsByPositionGreaterThan(parentId: string, position: number) {
        const products = await client.product.findMany({
            where: {
                parentId,
                position: {
                    gt: position,
                }
            }
        });

        return products;
    }
}