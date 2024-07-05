import express from 'express';
import users from '@/controllers/users';
import categories from '@/controllers/categories';
import products from '@/controllers/products';

const router = express.Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);

export default router;