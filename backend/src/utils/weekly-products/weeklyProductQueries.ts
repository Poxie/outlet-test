import client from "@/client";
import WeeklyProductsUtils from "./weeklyProductsUtils";
import { WeeklyProduct } from "@prisma/client";

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
    static async getAllProductWeeks() {
        const weekDates = WeeklyProductsUtils.getAllProductWeeks();

        // Create an array of objects with the date, week number, and an empty array of products
        const productWeeksData: {
            date: string;
            week: number;
            products: WeeklyProduct[];
        }[] = weekDates.map(({ date, week }) => {
            return {
                date,
                week,
                products: [],
            };
        });

        // Get all products for each week
        const productWeekProducts = await client.weeklyProduct.findMany({
            where: {
                date: {
                    in: weekDates.map(week => week.date),
                }
            }
        });

        // Add products to the correct week object
        for(const product of productWeekProducts) {
            const index = productWeeksData.findIndex(week => week.date === product.date);
            productWeeksData[index].products.push(product);
        }

        return productWeeksData;
    }
}