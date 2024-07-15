import asyncHandler from '@/utils/asyncHandler';
import CategoryQueries from '@/utils/categories/categoryQueries';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import ProductQueries from '@/utils/products/productQueries';
import { Category, ProductGroup } from '@prisma/client';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const groups = await ProductGroupQueries.getProductGroups();

    const categoriesWithGroups: {
        parentId: string | null;
        groups: ProductGroup[];
    }[] = [];

    const insertNewGroup = (parentId: string | null, group: ProductGroup) => {
        categoriesWithGroups.push({
            parentId,
            groups: [group],
        })
    }
    const addGroupToList = (parentId: string | null, group: ProductGroup) => {
        if(!parentId) {
            insertNewGroup(parentId, group);
            return;
        }

        const category = categoriesWithGroups.find(category => category.parentId === parentId);
        if(category) {
            category.groups.push(group);
            return;
        }

        insertNewGroup(parentId, group);
    }

    for(const group of groups) {
        const parentId = group.parentId;
        addGroupToList(parentId, group);
    }
    
    const groupsWithCategories: {
        category: Category | null;
        groups: ProductGroup[];
    }[] = [];
    for(const { parentId, groups } of categoriesWithGroups) {
        if(!parentId) {
            groupsWithCategories.push({
                category: null,
                groups,
            });
            continue;
        }

        const category = await CategoryQueries.getCategoryById(parentId);
        if(!category) continue;

        groupsWithCategories.push({
            category,
            groups,
        });
    }

    const sortedGroupsWithCategories = groupsWithCategories.reverse();

    res.send(sortedGroupsWithCategories);
}));

export default router;