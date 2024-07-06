import client from "@/client";

export default class WeeklyProductQueries {
    static async getWeeklyProducts(date: string) {
        const weeklyProducts = await client.weeklyProduct.findMany({
            where: {
                date,
            }
        });
        return weeklyProducts;
    }
    static async getWeeklyProductById(id: string) {
        const weeklyProduct = await client.weeklyProduct.findUnique({
            where: {
                id,
            }
        });

        return weeklyProduct;
    }
}