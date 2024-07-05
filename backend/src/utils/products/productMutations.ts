import client from "@/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductNotFoundError } from "./productErrors";

export default class ProductMutations {
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
}