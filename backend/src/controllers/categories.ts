import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { CategoryNotFound } from '@/utils/categories/categoryErrors';
import CategoryMutations from '@/utils/categories/categoryMutations';
import CategoryQueries from '@/utils/categories/categoryQueries';
import CategoryUtils from '@/utils/categories/categoryUtils';
import CustomError from '@/utils/errors';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import { MutableCategoryProps } from '@/utils/types';
import { createCategorySchema } from '@/validation/categorySchemas';
import express from 'express';

const router = express.Router();

router.post('/', auth, asyncHandler(async (req, res, next) => {
    const data = createCategorySchema.strict().parse(req.body);

    const categoryId = await CategoryUtils.generateCategoryId(data.title);

    let bannerImage: string;
    try {
        bannerImage = await ImageHandler.uploadImage(
            data.banner,
            `categories/${categoryId}/banner`,
        );
    } catch (error) {
        console.error(error);
        throw new CustomError('Failed to upload image', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const category = await CategoryMutations.createCategory({
        id: categoryId,
        title: data.title,
        description: data.description,
        bannerURL: bannerImage,
        createdAt: Date.now().toString(),
    });

    res.send(category);
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const withGroups = req.query.withGroups === 'true';

    const categories = await CategoryQueries.getCategories();

    // If withGroups is false, just return the categories
    if(!withGroups) {
        res.send(categories);
        return;
    }

    // If withGroups is true, fetch all groups related to each category
    const categoriesWithGroups = await Promise.all(
        categories.map(async (category) => {
            const groups = await ProductGroupQueries.getProductGroupsByParentId(category.id);

            const groupsWithProducts = await Promise.all(
                groups.map(async group => {
                    const products = await ProductQueries.getProductsByParentId(group.id);
                    return ({
                        ...group,
                        products,
                    });
                })
            );

            return ({
                ...category,
                groups: groupsWithProducts,
            });
        })
    );
    res.send(categoriesWithGroups);
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const withGroups = req.query.withGroups === 'true';

    const category = await CategoryQueries.getCategoryById(id);
    if(!category) throw new CategoryNotFound();

    // If withGroups is false, just return the category
    if(!withGroups) {
        res.send(category);
        return;
    }

    // If withGroups is true, fetch all groups related to the category
    const groups = await ProductGroupQueries.getProductGroupsByParentId(id);

    const groupsWithProducts = await Promise.all(
        groups.map(async group => {
            const products = await ProductQueries.getProductsByParentId(group.id);
            return ({
                ...group,
                products,
            });
        })
    );

    res.send({
        ...category,
        groups: groupsWithProducts,
    });
}))

router.patch('/:id', auth, asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    
    const data = createCategorySchema
        .strict()
        .partial()
        .parse(req.body);

    // Create a new object with the banner image removed, handle it separately
    const { banner, ...rest } = data;
    const changes: Partial<MutableCategoryProps> = rest;

    // If there is a new banner image, upload and add it to the changes
    if(data.banner) {
        let bannerImage: string;
        try {
            bannerImage = await ImageHandler.uploadImage(
                data.banner,
                `categories/${id}/banner`,
            );
        } catch (error) {
            console.error(error);
            throw new CustomError('Failed to upload image', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        changes.bannerURL = bannerImage;
    }

    const category = await CategoryMutations.updateCategory(id, data);

    res.send(category);
}))

router.delete('/:id', auth, asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    await ProductMutations.deleteByParentId(id);
    await CategoryMutations.deleteCategory(id);

    try {
        await ImageHandler.deleteFolder(`categories/${id}`);
    } catch(error) {
        // If an error is thrown, save it somewhere for later inspection
        console.error(error);
    }

    res.status(StatusCodes.NO_CONTENT).send();
}))

// Products
router.get('/:categoryId/products', asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const products = await ProductQueries.getProductsByParentId(categoryId);

    res.json(products);
}))

export default router;