import asyncHandler from '@/utils/asyncHandler';
import CategoryQueries from '@/utils/categories/categoryQueries';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import ProductQueries from '@/utils/products/productQueries';
import { Category, ProductGroup } from '@prisma/client';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const groups = await ProductGroupQueries.getProductGroups();

    const uniqueCategoryIds: string[] = [];
    for(const group of groups) {
        if(!group.parentId || uniqueCategoryIds.includes(group.parentId)) continue;
        uniqueCategoryIds.push(group.parentId);
    }

    const categories = await CategoryQueries.bulkGetCategoriesById(uniqueCategoryIds);

    const groupsWithCategories: {
        id: string;
        header: {
            title: string;
            description: string;
            bannerURL: string;
            path: string;
        };
        groups: ProductGroup[];
        hasCategory: boolean;
    }[] = [];
    for(const group of groups) {
        const category = categories.find(category => category.id === group.parentId);

        const existingCategoryIds = groupsWithCategories.map(c => c.id);        
        if(group.parentId && existingCategoryIds.includes(group.parentId)) {
            const index = existingCategoryIds.indexOf(group.parentId);
            groupsWithCategories[index].groups.push(group);
            continue;
        }

        groupsWithCategories.push({
            id: group.parentId || group.id,
            header: {
                title: category?.title || group.name,
                description: category?.description || group.description,
                bannerURL: category?.bannerURL || group.bannerURL,
                path: `/produkter/${group.parentId || group.id}`,
            },
            groups: [group],
            hasCategory: !!category,
        });
    }

    res.send(groupsWithCategories);
}));

export default router;