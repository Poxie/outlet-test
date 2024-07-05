import client from "@/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductNotFoundError } from "./productErrors";
import { Product } from "@prisma/client";

export default class ProductMutations {
    static async createProduct(data: Product) {
        const product = await client.product.create({
            data,
        });

        return product;
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

    static async deleteByParentId(parentId: string) {
        await client.product.deleteMany({
            where: {
                parentId,
            }
        });
    }
}