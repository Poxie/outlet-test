import client from "@/client";
import { ProductGroup } from "@prisma/client";
import { MutableProductGroupProps } from "../types";

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
}