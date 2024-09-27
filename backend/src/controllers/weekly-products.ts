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
            { id: "1", parentId: "2024-09-23", position: 0, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461859%2Fgroups%2Ftill-koket%2Fproducts%2F29650390.png&w=750&q=75" },
            { id: "2", parentId: "2024-09-23", position: 1, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461856%2Fgroups%2Ftill-koket%2Fproducts%2F30872602.png&w=750&q=75" },
            { id: "3", parentId: "2024-09-23", position: 2, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461856%2Fgroups%2Ftill-koket%2Fproducts%2F33563388.png&w=750&q=75" },
            { id: "4", parentId: "2024-09-23", position: 3, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461856%2Fgroups%2Ftill-koket%2Fproducts%2F39704984.png&w=750&q=75" },
            { id: "5", parentId: "2024-09-23", position: 4, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461856%2Fgroups%2Ftill-koket%2Fproducts%2F48875035.png&w=750&q=75" },
            { id: "6", parentId: "2024-09-23", position: 5, imageURL: "https://outlet.poxen.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdhmz2d926%2Fimage%2Fupload%2Fv1722461856%2Fgroups%2Ftill-koket%2Fproducts%2F55839229.png&w=750&q=75" },
        ]
    } })
    
}))

export default router;
