import { MAX_COOKIE_AGE } from '@/constants';
import { LoginErrorMessages } from '@/constants/loginErrorMessages';
import asyncHandler from '@/utils/asyncHandler';
import AuthUtils from '@/utils/auth/authUtils';
import { UnauthorizedError } from '@/utils/errors/commonErrors';
import UserQueries from '@/utils/users/userQueries';
import UserUtils from '@/utils/users/userUtils';
import { loginSchema } from '@/validation/loginSchemas';
import express from 'express';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const data = loginSchema.strict().parse(req.body);

    const user = await UserQueries.getUserByEmail(data.email);
    if(!user) {
        throw new UnauthorizedError(LoginErrorMessages.INVALID_CREDENTIALS);
    }

    const match = await AuthUtils.comparePasswords(data.password, user.password);
    if(!match) {
        throw new UnauthorizedError(LoginErrorMessages.INVALID_CREDENTIALS);
    }

    const token = AuthUtils.signToken(user.id);
    res.cookie('accessToken', token, { 
        httpOnly: true,
        maxAge: MAX_COOKIE_AGE,
    });

    const formattedUser = UserUtils.formatUser(user);

    res.json(formattedUser);
}))

export default router;