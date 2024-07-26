import client from "@/client";
import { Product } from "@prisma/client";
import ProductGroupMutations from "../product-groups/productGroupMutations";
import { PRODUCT_GROUP_TYPE } from "../product-groups/productGroupConstants";

export default class WeeklyProductMutations {
    static async createWeeklyProductGroup(date: string) {
        const bannerURL = process.env.DEFAULT_WEEKLY_BANNER_URL;
        if(!bannerURL) throw new Error('No default weekly banner URL provided');

        const weeklyProductGroup = await ProductGroupMutations.createProductGroup({
            id: date,
            name: '',
            description: '',
            groupType: PRODUCT_GROUP_TYPE.WEEKLY_PRODUCT,
            parentId: null,
            createdAt: Date.now().toString(),
            productCount: 0,
            bannerURL,
        });

        return {
            ...weeklyProductGroup,
            products: [],
        };
    }
    
    static async createWeeklyProducts(data: Product[]) {
        return await client.product.createMany({
            data,
        })
    }
    static async deleteWeeklyProducts(ids: string[]) {
        return await client.product.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        })
    }
}