import asyncHandler from '@/utils/asyncHandler';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { ProductNotFoundError } from '@/utils/products/productErrors';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import { createProductSchema } from '@/validation/productShemas';
import express from 'express';

const router = express.Router();

router.get('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await ProductQueries.getProductById(productId);
    if(!product) throw new ProductNotFoundError();

    res.json(product);
}))

router.post('/', asyncHandler(async (req, res) => {
    const data = req.body;

    createProductSchema
        .strict()
        .parse(data);

    const id = await ProductUtils.generateProductId();

    // Upload product image
    const imageURL = await ImageHandler.uploadImage(
        data.image,
        `categories/${data.parentId}/${id}`,
    )

    const product = await ProductMutations.createProduct({
        id,
        imageURL,
        parentId: data.parentId,
    });

    res.json(product);
}))

router.delete('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    await ImageHandler.deleteImage(`categories/${productId}`);

    await ProductMutations.deleteProduct(productId);

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;