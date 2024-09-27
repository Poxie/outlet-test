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

    res.json({ date: "2024-09-23", week: "54", group: {
        id: "2024-09-23",
        products: [
            { id: "1", parentId: "2024-09-23", position: 0, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461859/groups/till-koket/products/29650390.png&w=750&q=75" },
            { id: "2", parentId: "2024-09-23", position: 1, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461856/groups/till-koket/products/30872602.png&w=750&q=75" },
            { id: "3", parentId: "2024-09-23", position: 2, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461856/groups/till-koket/products/33563388.png&w=750&q=75" },
            { id: "4", parentId: "2024-09-23", position: 3, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461856/groups/till-koket/products/39704984.png&w=750&q=75" },
            { id: "5", parentId: "2024-09-23", position: 4, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461856/groups/till-koket/products/48875035.png&w=750&q=75" },
            { id: "6", parentId: "2024-09-23", position: 5, imageURL: "https://res.cloudinary.com/dhmz2d926/image/upload/v1722461856/groups/till-koket/products/55839229.png&w=750&q=75" },
        ]
    } })
    
}))

export default router;
