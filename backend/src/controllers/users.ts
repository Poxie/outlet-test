import asyncHandler from '@/utils/asyncHandler';
import { UserNotFoundError } from '@/utils/errors/userErrors';
import UserMutations from '@/utils/users/userMutations';
import UserQueries from '@/utils/users/userQueries';
import { createUserSchema } from '@/validation/userSchemas';
import express from 'express';

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    createUserSchema.parse({ name, email, password });

    const user = await UserMutations.createUser({ name, email, password });

    res.json(user);
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await UserQueries.getUserById(id);
    if(!user) throw new UserNotFoundError();

    res.json(user);
}))

router.patch('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    createUserSchema
        .strict()
        .partial()
        .parse(data);

    const user = await UserMutations.updateUser(id, data);

    res.json(user);
}))

export default router;