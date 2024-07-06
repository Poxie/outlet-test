import asyncHandler from '@/utils/asyncHandler';
import { InvalidDealDateError } from '@/utils/weekly-products/weeklyProductsErrors';
import WeeklyProductsUtils from '@/utils/weekly-products/weeklyProductsUtils';
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ message: WeeklyProductsUtils.getCurrentWeek() });
})

router.post('/:date?', asyncHandler(async (req, res) => {
    const { date } = req.params;
    const dateString = date || WeeklyProductsUtils.getCurrentWeek();

    const isDealDate = WeeklyProductsUtils.isDealDate(dateString);
    if(!isDealDate) {
        throw new InvalidDealDateError();
    }

    res.json({ isDealDate });
}))

export default router;