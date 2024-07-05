import asyncHandler from '@/utils/asyncHandler';
import CategoryMutations from '@/utils/categories/categoryMutations';
import CategoryQueries from '@/utils/categories/categoryQueries';
import CategoryUtils from '@/utils/categories/categoryUtils';
import CustomError from '@/utils/errors';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { createCategorySchema } from '@/validation/categorySchemas';
import express from 'express';

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const data: {
        title: string;
        description: string;
        banner: string;
    } = req.body;

    createCategorySchema.strict().parse(data);

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
    });

    res.send(category);
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const category = await CategoryQueries.getCategoryById(id);

    res.json(category);
}))

router.patch('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    // Make sure the data is valid
    createCategorySchema
        .strict()
        .partial()
        .parse(data);

    // If there is a new banner image, upload & update the URL
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

        data.bannerURL = bannerImage;
        delete data.banner;
    }

    const category = await CategoryMutations.updateCategory(id, data);

    res.json(category);
}))

export default router;