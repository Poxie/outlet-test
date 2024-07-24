import client from "@/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductNotFoundError } from "./productErrors";
import { Product } from "@prisma/client";
import CacheInvalidator from "../cache-invalidator";
import ProductUtils from "./productUtils";
import ProductGroupQueries from "../product-groups/productGroupQueries";

export default class ProductMutations {
    static async createProducts(data: Product[]) {
        await client.product.createMany({
            data,
        });

        const uniqueParentIds = ProductUtils.getUniqueParentIds(data);
        await Promise.all(uniqueParentIds.map(async parentId => {
            await CacheInvalidator.invalidateProductPage(parentId);
        }));
    }

    static async createProduct(data: Product) {
        const product = await client.product.create({
            data,
        });
        
        await CacheInvalidator.invalidateProductPage(product.parentId)

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
            
            await CacheInvalidator.invalidateProductPage(product.parentId);

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

        const uniqueParentIds = ProductUtils.getUniqueParentIds(products);
        await Promise.all(uniqueParentIds.map(async parentId => {
            await CacheInvalidator.invalidateProductPage(parentId);
        }));

        return products;
    }

    static async deleteProducts(ids: string[], parentId: string) {
        await client.product.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        });
        
        ProductUtils.invalidateProductParentPages(parentId);
    }

    static async deleteProduct(id: string) {
        try {
            const product = await client.product.delete({
                where: {
                    id,
                }
            });
            
            ProductUtils.invalidateProductParentPages(product.parentId);
    
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

        ProductUtils.invalidateProductParentPages(parentId);
    }

    static async deleteByParentId(parentId: string) {
        await client.product.deleteMany({
            where: {
                parentId,
            }
        });

        ProductUtils.invalidateProductParentPages(parentId);
    }
}