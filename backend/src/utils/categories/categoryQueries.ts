import client from "@/client";

export default class CategoryQueries {
    static async getCategories() {
        const categories = await client.category.findMany();
        return categories;
    }
    
    static async getCategoryById(id: string) {
        const category = await client.category.findUnique({
            where: {
                id,
            }
        });

        return category;
    }
}