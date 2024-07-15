import express from 'express';
import login from '@/controllers/login';
import users from '@/controllers/users';
import productList from '@/controllers/product-list';
import productGroups from '@/controllers/product-groups';
import categories from '@/controllers/categories';
import products from '@/controllers/products';
import weeklyProducts from '@/controllers/weekly-products';
import stores from '@/controllers/stores';
import analytics from '@/controllers/analytics';

const router = express.Router();

router.use('/login', login);
router.use('/users', users);
router.use('/stores', stores);
router.use('/product-groups', productGroups);
router.use('/categories', categories);
router.use('/products', products);
router.use('/weekly-products', weeklyProducts);
router.use('/product-list', productList)

router.use('/analytics', analytics);

export default router;