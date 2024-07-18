import client from "@/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductNotFoundError } from "./productErrors";
import { Product } from "@prisma/client";

export default class ProductMutations {
    static async createProducts(data: Product[]) {
        await client.product.createMany({
            data,
        });
    }

    static async createProduct(data: Product) {
        const product = await client.product.create({
            data,
        });

        return product;
    }

    static async updateProduct(id: string, data: Partial<Product>) {
        try {
            const product = await client.product.update({
                where: {
                    id,
                },
                data,
            });

            return product;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductNotFoundError();
            }
        }
    }

    static async bulkUpdateProducts(data: (Partial<Product> & {
        id: string;
    })[]) {
        const products = await Promise.all(data.map(async (product) => {
            const updatedProduct = await this.updateProduct(product.id, product);
            if(!updatedProduct) throw new ProductNotFoundError();
            return updatedProduct;
        }))
        return products;
    }

    static async deleteProducts(ids: string[]) {
        await client.product.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        });
    }

    static async deleteProduct(id: string) {
        try {
            const product = await client.product.delete({
                where: {
                    id,
                }
            });
    
            return product;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductNotFoundError();
            }
        }
    }

    static async deleteProductsByParentId(parentId: string) {
        await client.product.deleteMany({
            where: {
                parentId,
            }
        });
    }

    static async deleteByParentId(parentId: string) {
        await client.product.deleteMany({
            where: {
                parentId,
            }
        });
    }
}