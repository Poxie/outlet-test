import asyncHandler from '@/utils/asyncHandler';
import UserMutations from '@/utils/users/userMutations';
import { createUserSchema } from '@/validation/userSchemas';
import express from 'express';

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    createUserSchema.parse({ name, email, password });

    const user = await UserMutations.createUser({ name, email, password });

    res.json(user);
}))

export default router;