import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { CategoryNotFound } from '@/utils/categories/categoryErrors';
import CategoryQueries from '@/utils/categories/categoryQueries';
import CustomError from '@/utils/errors';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { ProductGroupNotFoundError } from '@/utils/product-groups/productGroupErrors';
import ProductGroupMutations from '@/utils/product-groups/productGroupMutations';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import productGroupUtils from '@/utils/product-groups/productGroupUtils';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import { MutableProductGroupProps } from '@/utils/types';
import { createProductGroupSchema } from '@/validation/productGroupSchemas';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const withProducts = req.query.withProducts === 'true';

    const groups = await ProductGroupQueries.getProductGroups(withProducts);

    res.send(groups);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const withProducts = req.query.withProducts === 'true';

    const group = await ProductGroupQueries.getProductGroupById(id, withProducts);
    if(!group) throw new ProductGroupNotFoundError();

    res.send(group);
}))

router.post('/', auth, asyncHandler(async (req, res, next) => {
    const data = createProductGroupSchema.strict().parse(req.body);

    // If parentId is provided, check if it exists
    if(data.parentId) {
        const category = await CategoryQueries.getCategoryById(data.parentId);
        if(!category) throw new CategoryNotFound();
    }

    const groupId = await productGroupUtils.generateId(data.name);

    let bannerImage: string;
    try {
        bannerImage = await ImageHandler.uploadImage(
            data.banner,
            `groups/${groupId}/banner`,
        );
    } catch (error) {
        console.error(error);
        throw new CustomError('Failed to upload image', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const productGroup = await ProductGroupMutations.createProductGroup({
        id: groupId,
        name: data.name,
        description: data.description,
        bannerURL: bannerImage,
        createdAt: Date.now().toString(),
        parentId: null,
        productCount: 0,
    });

    res.send(productGroup);
}))

router.patch('/:id', auth, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = createProductGroupSchema.strict().partial().parse(req.body);

    const group = await ProductGroupQueries.getProductGroupById(id);
    if(!group) throw new ProductGroupNotFoundError();

    // If parentId is provided, check if it exists
    if(data.parentId) {
        const category = await CategoryQueries.getCategoryById(data.parentId);
        if(!category) throw new CategoryNotFound();
    }

    // If banner is provided, upload it and replace previous one
    let bannerImage: string | undefined;
    if(data.banner) {
        try {
            bannerImage = await ImageHandler.uploadImage(
                data.banner,
                `groups/${id}/banner`,
            );
        } catch (error) {
            console.error(error);
            throw new CustomError('Failed to upload image', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    // Remove banner from text changes, as it's handled separately
    const { banner, ...rest } = data;

    // Create an object of the text changes and add bannerURL if it was uploaded
    const changes: Partial<MutableProductGroupProps> = rest;
    if(bannerImage) changes.bannerURL = bannerImage;

    const updatedGroup = await ProductGroupMutations.updateProductGroup(id, changes);

    res.send(updatedGroup);
}))

router.delete('/:id', auth, asyncHandler(async (req, res) => {
    const id = req.params.id;

    // Remove all images related to the group
    await ImageHandler.deleteFolder(`groups/${id}`);

    // Delete all products related to the group and the group itself
    await ProductMutations.deleteProductsByParentId(id);
    await ProductGroupMutations.deleteProductGroup(id);

    res.status(StatusCodes.NO_CONTENT).send();
}));

router.get('/:id/products', asyncHandler(async (req, res) => {
    const id = req.params.id;

    const products = await ProductQueries.getProductsByParentId(id);

    res.send(ProductUtils.sortProductsByPosition(products));
}))

export default router;