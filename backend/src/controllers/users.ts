import auth from '@/middlewares/auth';
import asyncHandler from '@/utils/asyncHandler';
import { UnauthorizedError } from '@/utils/errors/commonErrors';
import { UserNotFoundError } from '@/utils/errors/userErrors';
import UserMutations from '@/utils/users/userMutations';
import UserQueries from '@/utils/users/userQueries';
import { createUserSchema } from '@/validation/userSchemas';
import express from 'express';

const router = express.Router();

router.get('/', auth, asyncHandler(async (req, res, next) => {
    const users = await UserQueries.getUsers();
    res.json(users);
}))

router.post('/', auth, asyncHandler(async (req, res, next) => {
    const data = createUserSchema.strict().parse(req.body);
    
    // If the user is not an admin, they cannot create a user
    if(!res.locals.isAdmin) {
        throw new UnauthorizedError();
    }

    const user = await UserMutations.createUser(data);

    res.json(user);
}))

router.get('/:id', auth, asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    const loggedInId = res.locals.userId;

    if(id === 'me' && loggedInId) {
        id = loggedInId;
    }

    const user = await UserQueries.getUserById(id);
    if(!user) throw new UserNotFoundError();

    res.json(user);
}))

router.patch('/:id', auth, asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { isAdmin } = res.locals

    const data = createUserSchema
        .strict()
        .partial()
        .parse(req.body);

    // If updating the role, make sure the user is an admin and not themselves
    if(
        data.role && 
        (!isAdmin || id === res.locals.userId)
    ) {
        throw new UnauthorizedError();
    }

    const user = await UserMutations.updateUser(id, data);

    res.json(user);
}))

export default router;