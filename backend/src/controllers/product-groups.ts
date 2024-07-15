import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import CustomError from '@/utils/errors';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { ProductGroupNotFoundError } from '@/utils/product-groups/productGroupErrors';
import ProductGroupMutations from '@/utils/product-groups/productGroupMutations';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import productGroupUtils from '@/utils/product-groups/productGroupUtils';
import { createProductGroupSchema } from '@/validation/productGroupSchemas';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const groups = await ProductGroupQueries.getProductGroups();
    res.send(groups);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    const group = await ProductGroupQueries.getProductGroupById(id);
    if(!group) throw new ProductGroupNotFoundError();

    res.send(group);
}))

router.post('/', auth, asyncHandler(async (req, res, next) => {
    const data = createProductGroupSchema.strict().parse(req.body);

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
    });

    res.send(productGroup);
}))

export default router;