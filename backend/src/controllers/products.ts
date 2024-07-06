import asyncHandler from '@/utils/asyncHandler';
import { CategoryNotFound } from '@/utils/categories/categoryErrors';
import CategoryQueries from '@/utils/categories/categoryQueries';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { ProductNotFoundError } from '@/utils/products/productErrors';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import { createProductSchema, deleteProductsSchema } from '@/validation/productShemas';
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

    // Check if parent category exists
    const category = await CategoryQueries.getCategoryById(data.parentId);
    if(!category) throw new CategoryNotFound();

    // Upload images for each product
    const productsData = await Promise.all(data.images.map(async (image: string) => {
        const id = await ProductUtils.generateProductId();

        const imageURL = await ImageHandler.uploadImage(
            image,
            `categories/${data.parentId}/${id}`,
        );

        return { 
            id, 
            imageURL,
            parentId: data.parentId,
        };
    }))

    await ProductMutations.createProducts(productsData);

    const products = await ProductQueries.getProductsByParentId(data.parentId);

    res.json(products);
}))

router.delete('/', asyncHandler(async (req, res) => {
    const { productIds } = req.body;

    deleteProductsSchema.parse({ productIds });

    try {
        await Promise.all(productIds.map(async (productId: string) => {
            ImageHandler.deleteImage(`categories/${productId}`);
        }));
    } catch(error) {
        // Log error somewhere for later investigation
        console.error(error);
    }

    await ProductMutations.deleteProducts(productIds);

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;