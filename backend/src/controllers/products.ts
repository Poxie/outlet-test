import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import { PRODUCT_GROUP_TYPE } from '@/utils/product-groups/productGroupConstants';
import { ProductGroupNotFoundError, ProductPositionError } from '@/utils/product-groups/productGroupErrors';
import ProductGroupMutations from '@/utils/product-groups/productGroupMutations';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import { ProductNotFoundError } from '@/utils/products/productErrors';
import ProductMutations from '@/utils/products/productMutations';
import ProductQueries from '@/utils/products/productQueries';
import ProductUtils from '@/utils/products/productUtils';
import WeeklyProductMutations from '@/utils/weekly-products/weeklyProductMutations';
import { InvalidDealDateError } from '@/utils/weekly-products/weeklyProductsErrors';
import WeeklyProductsUtils from '@/utils/weekly-products/weeklyProductsUtils';
import { createProductSchema, deleteProductsSchema, updateProductPositionsSchema } from '@/validation/productShemas';
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
    if(!data.parentType) {
        data.parentType = PRODUCT_GROUP_TYPE.PRODUCT_GROUP;
    }

    // If its weekly deals, and the date is not a deal date, throw an error
    if(
        data.parentType === PRODUCT_GROUP_TYPE.WEEKLY_PRODUCT && 
        !WeeklyProductsUtils.isDealDate(data.parentId)
    ) {
        throw new InvalidDealDateError();
    }

    // Check if product group exists
    let group = await ProductGroupQueries.getProductGroupById(data.parentId, false);

    // If it doesnt exist & type is weekly product, create it
    if(!group && data.parentType === PRODUCT_GROUP_TYPE.WEEKLY_PRODUCT) {
        group = await WeeklyProductMutations.createWeeklyProductGroup(data.parentId);
    }

    // Else if the group doesnt exist, throw an error
    if(!group) {
        throw new ProductGroupNotFoundError();
    }

    // Upload images and create product objects
    const currentProductCount = group.productCount;
    const products = await Promise.all(data.images.map(async (image, index) => {
        const productId = await ProductUtils.generateId();
        const imageURL = await ImageHandler.uploadImage(image, `groups/${data.parentId}/products/${productId}`);

        const productObject: Product = {
            id: productId,
            imageURL,
            parentId: data.parentId,
            position: currentProductCount + index,
        }

        return productObject;
    }));

    await ProductMutations.createProducts(products);

    res.json(products);
}))

router.patch('/positions', auth, asyncHandler(async (req, res) => {
    const { positions, parentId } = updateProductPositionsSchema.strict().parse(req.body);

    const productIds = positions.map(position => position.id);
    const products = await ProductQueries.bulkGetProductsById(productIds);

    // Check if product group exists
    const productGroup = await ProductGroupQueries.getProductGroupById(parentId, false);
    if(!productGroup) throw new ProductNotFoundError();

    // Check that all products belong to the same group
    if(products.some(product => product.parentId !== productGroup.id)) {
        throw new ProductPositionError('Products do not belong to the same group');
    }
    // Check that all products are present
    if(products.length !== productGroup.productCount) {
        throw new ProductPositionError('All products need to be present');
    }

    // Make sure all positions are unique
    const positionsSet = new Set();
    for(const position of positions) {
        if(positionsSet.has(position.position)) {
            throw new ProductPositionError('Positions must be unique');
        }
        positionsSet.add(position.position);
    }

    // Make sure positions are consecutive
    const sortedPositions = positions.sort((a, b) => a.position - b.position);
    for(let i = 0; i < sortedPositions.length; i++) {
        if(sortedPositions[i].position !== i) {
            throw new ProductPositionError('Positions must be consecutive');
        }
    }

    // Update positions
    const newProducts = await ProductMutations.bulkUpdateProducts(positions);

    res.send(ProductUtils.sortProductsByPosition(newProducts));
}))

router.delete('/', auth, asyncHandler(async (req, res) => {
    const { productIds, parentId } = deleteProductsSchema.strict().parse(req.body);

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

    await ProductMutations.deleteProducts(productIds, parentId);

    // Updating all products with position greater than the deleted product
    const largestToSmallestIndices = indicesDeleted.sort((a, b) => b - a);
    for(const index of largestToSmallestIndices) {
        const products = await ProductQueries.getProductsByPositionGreaterThan(parentId, index);
        await Promise.all(products.map(async (product, i) => {
            await ProductMutations.updateProduct(product.id, {
                position: product.position - 1,
            });
        }));
    }

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;