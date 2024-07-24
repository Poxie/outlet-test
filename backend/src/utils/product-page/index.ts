import { Category } from "@prisma/client";
import CategoryQueries from "../categories/categoryQueries";
import ProductGroupQueries from "../product-groups/productGroupQueries";
import { ProductGroupWithProducts } from "../types";
import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";
import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";
import { ProductPage as ProductPageType } from "../types";

export default class ProductPage {
    private static generateHeader(
        category: Category | null, 
        productGroups: ProductGroupWithProducts[],
    ): ProductPageType['header'] {
        const firstGroup = productGroups[0];
        return {
            title: category?.title || firstGroup.name,
            description: category?.description || firstGroup.description,
            bannerURL: category?.bannerURL || firstGroup.bannerURL,
        };
    }

    static async getProductPage(id: string): Promise<ProductPageType> {
        // First, check if the product page is cached
        const cachedPage = await RedisHandler.get<ProductPageType>(REDIS_KEYS.productPage(id));
        if(cachedPage) return cachedPage;

        // Check if the id is a category
        const category = await CategoryQueries.getCategoryById(id);

        const productGroups: ProductGroupWithProducts[] = [];

        if(category) {
            const groups = await ProductGroupQueries.getProductGroupsByParentId(id);
            productGroups.push(...groups);
        }
        if(!category) {
            const group = await ProductGroupQueries.getProductGroupById(id, true);
            if(group) {
                productGroups.push(group);
            }
        }

        if(productGroups.length === 0) {
            throw new CustomError('Product page not found', StatusCodes.NOT_FOUND);
        }

        const header = this.generateHeader(category, productGroups);

        const productPage = {
            header,
            groups: productGroups,
        };

        // Cache the product page
        await RedisHandler.set(REDIS_KEYS.productPage(id), productPage);

        return productPage;
    }
}