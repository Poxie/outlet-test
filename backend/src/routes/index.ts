import express from 'express';
import users from '@/controllers/users';
import categories from '@/controllers/categories';

const router = express.Router();

router.use('/users', users);
router.use('/categories', categories);

export default router;