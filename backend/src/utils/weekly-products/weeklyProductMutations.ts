import client from "@/client";
import { WeeklyProduct } from "@prisma/client";

export default class WeeklyProductMutations {
    static async createWeeklyProducts(data: WeeklyProduct[]) {
        return await client.weeklyProduct.createMany({
            data,
        })
    }
    static async deleteWeeklyProducts(ids: string[]) {
        return await client.weeklyProduct.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        })
    }
}