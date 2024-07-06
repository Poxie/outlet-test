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
    static async getUpcomingWeeklyProducts() {
        const upcomingWeekDates = WeeklyProductsUtils.getUpcomingWeeks();

        const upcomingWeeks: {
            date: string;
            week: number;
            products: WeeklyProduct[];
        }[] = upcomingWeekDates.map(({ date, week }) => {
            return {
                date,
                week,
                products: [],
            };
        });

        const upcomingProducts = await client.weeklyProduct.findMany({
            where: {
                date: {
                    in: upcomingWeekDates.map(week => week.date),
                }
            }
        });

        for(const product of upcomingProducts) {
            const index = upcomingWeeks.findIndex(week => week.date === product.date);
            upcomingWeeks[index].products.push(product);
        }

        return upcomingWeeks;
    }
}