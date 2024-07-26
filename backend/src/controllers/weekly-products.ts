import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { ProductGroupNotFoundError } from '@/utils/product-groups/productGroupErrors';
import ProductGroupQueries from '@/utils/product-groups/productGroupQueries';
import ProductQueries from '@/utils/products/productQueries';
import WeeklyProductQueries from '@/utils/weekly-products/weeklyProductQueries';
import { InvalidDealDateError } from '@/utils/weekly-products/weeklyProductsErrors';
import WeeklyProductsUtils from '@/utils/weekly-products/weeklyProductsUtils';
import express from 'express';

const router = express.Router();

router.get('/', auth, asyncHandler(async (req, res, next) => {
    const upcomingProducts = await WeeklyProductQueries.getAllProductWeeks();

    res.json(upcomingProducts);
}))

router.get('/:date', asyncHandler(async (req, res, next) => {
    let { date } = req.params;
    if(date === 'current') {
        date = WeeklyProductsUtils.getCurrentWeek();
    }

    const isDealDate = WeeklyProductsUtils.isDealDate(date);
    if(!isDealDate) {
        throw new InvalidDealDateError();
    }

    const group = await ProductGroupQueries.getProductGroupById(date, true);
    if(!group) {
        throw new ProductGroupNotFoundError();
    }

    const week = WeeklyProductsUtils.getWeekNumber(date);

    group.products = group?.products.sort((a, b) => a.position - b.position);

    res.json({
        date,
        week,
        group,
    });
}))

export default router;