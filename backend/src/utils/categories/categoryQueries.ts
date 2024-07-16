import client from "@/client";

export default class CategoryQueries {
    // Replace with relational queries later
    static async getCategoryGroupCount(categoryId: string) {
        const count = await client.productGroup.count({
            where: {
                parentId: categoryId,
            }
        });

        return count;
    }

    static async getCategories() {
        const categories = await client.category.findMany();

        const categoriesWithGroupCount = await Promise.all(
            categories.map(async (category) => {
                const groupCount = await this.getCategoryGroupCount(category.id);
                return {
                    ...category,
                    groupCount,
                };
            })
        );

        return categoriesWithGroupCount;
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