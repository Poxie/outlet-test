import { UnauthorizedError } from "@/utils/errors/commonErrors";
import { NextFunction, Request, Response } from "express";

export default function requiresAdmin(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.isAdmin) {
        throw new UnauthorizedError();
    }
    next();
}