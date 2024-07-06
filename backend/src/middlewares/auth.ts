import AuthUtils from "@/utils/auth/authUtils";
import { UnauthorizedError } from "@/utils/errors/commonErrors";
import { NextFunction, Request, Response } from "express";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies);
    const accessToken = req.cookies?.accessToken;
    if(!accessToken) {
        next(new UnauthorizedError());
        return;
    }

    const userId = AuthUtils.verifyToken(accessToken);
    if(!userId) {
        next(new UnauthorizedError());
        return;
    }

    res.locals.userId = userId;

    next();
}