import express from 'express';
import login from '@/controllers/login';
import users from '@/controllers/users';
import categories from '@/controllers/categories';
import products from '@/controllers/products';
import weeklyProducts from '@/controllers/weekly-products';
import stores from '@/controllers/stores';

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/stores', stores);
router.use('/categories', categories);
router.use('/products', products);
router.use('/weekly-products', weeklyProducts);

export default router;