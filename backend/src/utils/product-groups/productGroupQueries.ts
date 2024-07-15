import client from "@/client";

export default class ProductGroupQueries {
    static async getProductGroups() {
        return client.productGroup.findMany();
    }
    static async getProductGroupById(id: string) {
        return client.productGroup.findUnique({
            where: {
                id,
            }
        });
    }
}