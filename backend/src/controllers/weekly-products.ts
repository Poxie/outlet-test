import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { StatusCodes } from '@/utils/errors/statusCodes';
import ImageHandler from '@/utils/images/imageHandler';
import WeeklyProductMutations from '@/utils/weekly-products/weeklyProductMutations';
import WeeklyProductQueries from '@/utils/weekly-products/weeklyProductQueries';
import { InvalidDealDateError } from '@/utils/weekly-products/weeklyProductsErrors';
import WeeklyProductsUtils from '@/utils/weekly-products/weeklyProductsUtils';
import { createWeeklyProductSchema, deleteWeeklyProductsSchema } from '@/validation/weeklyProductSchemas';
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

    const products = await WeeklyProductQueries.getWeeklyProducts(date);
    const week = WeeklyProductsUtils.getWeekNumber(date);

    res.json({
        date,
        week,
        products,
    });
}))

router.post('/:date?', auth, asyncHandler(async (req, res) => {
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

router.delete('/', auth, asyncHandler(async (req, res) => {
    const { productIds } = req.body;

    deleteWeeklyProductsSchema.parse({ productIds });

    await WeeklyProductMutations.deleteWeeklyProducts(productIds);

    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;