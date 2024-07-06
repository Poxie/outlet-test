import asyncHandler from '@/utils/asyncHandler';
import ImageHandler from '@/utils/images/imageHandler';
import WeeklyProductMutations from '@/utils/weekly-products/weeklyProductMutations';
import WeeklyProductQueries from '@/utils/weekly-products/weeklyProductQueries';
import { InvalidDealDateError } from '@/utils/weekly-products/weeklyProductsErrors';
import WeeklyProductsUtils from '@/utils/weekly-products/weeklyProductsUtils';
import { createWeeklyProductSchema } from '@/validation/weeklyProductSchemas';
import express from 'express';

const router = express.Router();

router.get('/:date?', asyncHandler(async (req, res, next) => {
    const { date } = req.params;
    const dateString = date || WeeklyProductsUtils.getCurrentWeek();

    const isDealDate = WeeklyProductsUtils.isDealDate(dateString);
    if(!isDealDate) {
        throw new InvalidDealDateError();
    }

    const products = await WeeklyProductQueries.getWeeklyProducts(dateString);

    res.json(products);
}))

router.post('/:date?', asyncHandler(async (req, res) => {
    const { images } = req.body;
    const { date } = req.params;
    const dateString = date || WeeklyProductsUtils.getCurrentWeek();

    const isDealDate = WeeklyProductsUtils.isDealDate(dateString);
    if(!isDealDate) {
        throw new InvalidDealDateError();
    }

    createWeeklyProductSchema.parse({ images });

    const imagesWithId = [];
    for(const image of images) {
        const id = await WeeklyProductsUtils.generateWeeklyProductId();
        imagesWithId.push({
            id,
            image,
        })
    }

    const newWeeklyProducts = await Promise.all(imagesWithId.map(async ({ id, image }) => {
        const path = `weekly-products/${dateString}/${id}`;
        const secureUrl = await ImageHandler.uploadImage(image, path);
        return { 
            id, 
            imageURL: secureUrl,
            date: dateString,
        };
    }));

    await WeeklyProductMutations.createWeeklyProducts(newWeeklyProducts);

    const allProducts = await WeeklyProductQueries.getWeeklyProducts(dateString);

    res.json(allProducts);
}))

export default router;