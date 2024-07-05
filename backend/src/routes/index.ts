import express from 'express';
import users from '@/controllers/users';

const router = express.Router();

router.use('/users', users);

export default router;