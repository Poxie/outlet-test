import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import ProductList from '@/utils/product-list';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const productList = await ProductList.getProductList();
    res.send(productList);
}));

export default router;