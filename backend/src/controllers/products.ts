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
    for(let i = 0; i < data.images.length; i++) {
        const image = data.images[i];

        const productId = await ProductUtils.generateId();
        const imageURL = await ImageHandler.uploadImage(image, `groups/${data.parentId}/products/${productId}`);

        const currentProductCount = group.productCount;
        const productObject: Product = {
            id: productId,
            imageURL,
            parentId: data.parentId,
            position: currentProductCount + i,
        }
        
        products.push(productObject);
    }

    await ProductMutations.createProducts(products);

    const allProducts = await ProductQueries.getProductsByParentId(data.parentId);

    res.json(allProducts);
}))

router.delete('/', auth, asyncHandler(async (req, res) => {
    const { productIds } = deleteProductsSchema.strict().parse(req.body);

    const indicesDeleted: number[] = [];
    try {
        await Promise.all(productIds.map(async (productId: string) => {
            const product = await ProductQueries.getProductById(productId);
            if(!product) return;

            ImageHandler.deleteImage(`groups/${product?.parentId}/products/${productId}`);

            indicesDeleted.push(product.position);
        }));
    } catch(error) {
        // Log error somewhere for later investigation
        console.error(error);
    }

    await ProductMutations.deleteProducts(productIds);

    // Updating all products with position greater than the deleted product
    for(const index of indicesDeleted) {
        const products = await ProductQueries.getProductsByPositionGreaterThan(index);
        await Promise.all(products.map(async (product, i) => {
            await ProductMutations.updateProduct(product.id, {
                position: product.position - 1,
            });
        }));
    }

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;