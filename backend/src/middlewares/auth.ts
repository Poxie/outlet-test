import AuthUtils from "@/utils/auth/authUtils";
import { UnauthorizedError } from "@/utils/errors/commonErrors";
import UserQueries from "@/utils/users/userQueries";
import { NextFunction, Request, Response } from "express";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies);
    const accessToken = req.cookies?.accessToken;
    if(!accessToken) {
        next(new UnauthorizedError());
        return;
    }

    // Get the logged in users id
    const userId = AuthUtils.verifyToken(accessToken);
    if(!userId) {
        next(new UnauthorizedError());
        return;
    }

    // Check if the user is an admin
    const isAdmin = await UserQueries.isAdmin(userId);

    res.locals.userId = userId;
    res.locals.isAdmin = isAdmin;

    next();
}