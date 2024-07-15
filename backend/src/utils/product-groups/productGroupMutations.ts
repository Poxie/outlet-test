import client from "@/client";
import { ProductGroup } from "@prisma/client";

export default class ProductGroupMutations {
    static async createProductGroup(data: ProductGroup) {
        return client.productGroup.create({
            data,
        });
    }
}