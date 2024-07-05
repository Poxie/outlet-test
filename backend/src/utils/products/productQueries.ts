import client from "@/client";
import { Product } from "@prisma/client";
import ProductUtils from "./productUtils";

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

    static async createProduct(data: Product) {
        const product = await client.product.create({
            data,
        });

        return product;
    }
}