import { CommonErrorMessages } from "@/constants/commonErrorMessages";
import CustomError from ".";
import { StatusCodes } from "./statusCodes";

export class UnauthorizedError extends CustomError {
    constructor(message?: string) {
        super(message || CommonErrorMessages.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
}