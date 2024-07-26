import client from "@/client";
import WeeklyProductsUtils from "./weeklyProductsUtils";
import { Product, ProductGroup } from "@prisma/client";
import ProductGroupQueries from "../product-groups/productGroupQueries";
import WeeklyProductMutations from "./weeklyProductMutations";

export default class WeeklyProductQueries {
    static async getWeeklyProducts(date: string) {
        const weeklyProducts = await client.product.findMany({
            where: {
                parentId: date,
            }
        });
        return weeklyProducts;
    }
    static async getWeeklyProductById(id: string) {
        const weeklyProduct = await client.product.findUnique({
            where: {
                id,
            }
        });

        return weeklyProduct;
    }
    static async getAllProductWeeks() {
        const weekDates = WeeklyProductsUtils.getAllProductWeeks();

        const weekGroups = await ProductGroupQueries.getProductGroupsByIds(
            weekDates.map(week => week.date),
            true,
        );

        // Create an array of objects with the date, week number, and an empty array of products
        const productWeeksData: {
            date: string;
            week: number;
            group: ProductGroup;
        }[] = await Promise.all(weekDates.map(async ({ date, week }) => {
            let group = weekGroups.find(group => group.id === date);
            if(!group) {
                group = await WeeklyProductMutations.createWeeklyProductGroup(date);
            }

            return {
                date,
                week,
                group,
            };
        }));

        return productWeeksData;
    }
}