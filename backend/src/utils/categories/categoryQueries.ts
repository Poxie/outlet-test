import client from "@/client";

export default class CategoryQueries {
    static async getCategoryById(id: string) {
        const category = await client.category.findUnique({
            where: {
                id,
            }
        });

        return category;
    }
}