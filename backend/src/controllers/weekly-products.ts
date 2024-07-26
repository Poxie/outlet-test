import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
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

    const products = await ProductQueries.getProductsByParentId(date);
    const week = WeeklyProductsUtils.getWeekNumber(date);

    res.json({
        date,
        week,
        products,
    });
}))

export default router;