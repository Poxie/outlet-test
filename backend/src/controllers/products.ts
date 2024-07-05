import asyncHandler from '@/utils/asyncHandler';
import ImageHandler from '@/utils/images/imageHandler';
import { ProductNotFoundError } from '@/utils/products/productErrors';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import { createProductSchema } from '@/validation/productShemas';
import express from 'express';

const router = express.Router();

router.get('/products/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await ProductQueries.getProductById(productId);
    if(!product) throw new ProductNotFoundError();

    res.json(product);
}))

router.post('/products', asyncHandler(async (req, res) => {
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

    const product = await ProductQueries.createProduct({
        id,
        imageURL,
        parentId: data.parentId,
    });

    res.json(product);
}))

export default router;