import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { CategoryNotFound } from '@/utils/categories/categoryErrors';
import CategoryQueries from '@/utils/categories/categoryQueries';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import { ProductNotFoundError } from '@/utils/products/productErrors';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import { createProductSchema, deleteProductsSchema } from '@/validation/productShemas';
import { Product } from '@prisma/client';
import express from 'express';

const router = express.Router();

router.get('/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await ProductQueries.getProductById(productId);
    if(!product) throw new ProductNotFoundError();

    res.json(product);
}))

router.post('/', auth, asyncHandler(async (req, res) => {
    const data = createProductSchema.strict().parse(req.body);

    // Check if product group exists
    const group = await ProductGroupQueries.getProductGroupById(data.parentId);
    if(!group) throw new ProductNotFoundError();

    // Upload images and create product objects
    const products: Product[] = [];
    for(const image of data.images) {
        const productId = await ProductUtils.generateId();
        const imageURL = await ImageHandler.uploadImage(image, `groups/${data.parentId}/products/${productId}`);

        const productObject: Product = {
            id: productId,
            imageURL,
            parentId: data.parentId,
            // !Fix this to be based on the position of the image in the array
            position: 0,
        }
        
        products.push(productObject);
    }

    await ProductMutations.createProducts(products);

    const allProducts = await ProductQueries.getProductsByParentId(data.parentId);

    res.json(allProducts);
}))

router.delete('/', auth, asyncHandler(async (req, res) => {
    const { productIds } = deleteProductsSchema.strict().parse(req.body);

    try {
        await Promise.all(productIds.map(async (productId: string) => {
            const product = await ProductQueries.getProductById(productId);
            ImageHandler.deleteImage(`groups/${product?.parentId}/products/${productId}`);
        }));
    } catch(error) {
        // Log error somewhere for later investigation
        console.error(error);
    }

    await ProductMutations.deleteProducts(productIds);

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;