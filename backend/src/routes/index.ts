import express from 'express';
import users from '@/controllers/users';
import categories from '@/controllers/categories';
import products from '@/controllers/products';
import weeklyProducts from '@/controllers/weekly-products';

const router = express.Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);
router.use('/weekly-products', weeklyProducts);

export default router;