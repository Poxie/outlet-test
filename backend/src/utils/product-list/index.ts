import CategoryQueries from "../categories/categoryQueries";
import ProductGroupQueries from "../product-groups/productGroupQueries";
import REDIS_KEYS from "../redis/redisKeys";
import RedisHandler from "../redis/redisHandler";
import { ProductListItem } from "../types";

export default class ProductList {
    static async getProductList() {
        // First check if the product list is cached
        const cacheKey = REDIS_KEYS.productList;
        const cachedProductList = await RedisHandler.get(cacheKey);
        if(cachedProductList) return cachedProductList;

        // If its not cached, fetch the groups & categories and create the product list
        const groups = await ProductGroupQueries.getProductGroups(true);

        // Get all unique categories for the groups
        const uniqueCategoryIds: string[] = [];
        for(const group of groups) {
            if(!group.parentId || uniqueCategoryIds.includes(group.parentId)) continue;
            uniqueCategoryIds.push(group.parentId);
        }

        const categories = await CategoryQueries.bulkGetCategoriesById(uniqueCategoryIds);

        // Product list, array of product list items
        const groupsWithCategories: ProductListItem[] = [];

        // For each group, find the category it belongs to and add it to the groupsWithCategories array
        for(const group of groups) {
            // Get the category the group belongs to
            const category = categories.find(category => category.id === group.parentId);

            // If the category exists, find it in the product list array and add the group to it
            const existingCategoryIds = groupsWithCategories.map(c => c.id);        
            if(group.parentId && existingCategoryIds.includes(group.parentId)) {
                const index = existingCategoryIds.indexOf(group.parentId);
                groupsWithCategories[index].groups.push(group);
                continue;
            }

            // If the category doesn't exist, create a new list object
            // If the group has a parent, use parent for header, else use group
            const listItem: ProductListItem = {
                id: group.parentId || group.id,
                header: {
                    title: category?.title || group.name,
                    description: category?.description || group.description,
                    bannerURL: category?.bannerURL || group.bannerURL,
                    path: `/${group.parentId || group.id}`,
                },
                groups: [group],
                hasCategory: !!category,
            }

            groupsWithCategories.push(listItem);
        }

        // Cache the product list
        await RedisHandler.set(cacheKey, groupsWithCategories);

        return groupsWithCategories;
    }
}