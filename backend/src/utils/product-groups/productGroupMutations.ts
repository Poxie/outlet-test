import client from "@/client";
import { ProductGroup } from "@prisma/client";
import { MutableProductGroupProps } from "../types";
import { PrismaCodes } from "../errors/prismaCodes";
import { ProductGroupNotFoundError } from "./productGroupErrors";

export default class ProductGroupMutations {
    static async createProductGroup(data: ProductGroup) {
        return client.productGroup.create({
            data,
        });
    }
    static async updateProductGroup(id: string, data: Partial<MutableProductGroupProps>) {
        return client.productGroup.update({
            where: {
                id,
            },
            data,
        });
    }
    static async deleteProductGroup(id: string) {
        try {
            await client.productGroup.delete({
                where: {
                    id,
                },
            });
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new ProductGroupNotFoundError();
            }
        }
    }
}