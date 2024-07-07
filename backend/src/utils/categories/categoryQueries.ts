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

    static async getProductCount(categoryId: string) {
        const count = await client.product.count({
            where: {
                parentId: categoryId,
            }
        });

        return count;
    }
}