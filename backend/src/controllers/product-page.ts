import asyncHandler from '@/utils/asyncHandler';
import ProductPage from '@/utils/product-page';
import express from 'express';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const productPage = await ProductPage.getProductPage(id);

    res.send(productPage);
}));

export default router;