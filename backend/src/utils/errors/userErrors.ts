import { UserErrorMessages } from "@/constants/userErrorMessages";
import CustomError from ".";
import { StatusCodes } from "./statusCodes";

export class EmailTakenError extends CustomError {
    constructor() {
        super(UserErrorMessages.emailTaken, StatusCodes.UNAUTHORIZED);
    }
}

export class UserNotFoundError extends CustomError {
    constructor() {
        super(UserErrorMessages.userNotFound, StatusCodes.NOT_FOUND);
    }
}