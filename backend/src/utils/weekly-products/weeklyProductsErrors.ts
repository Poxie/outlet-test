import { WeeklyProductErrorMessages } from "@/constants/weeklyProductErrorMessages";
import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";

export class InvalidDealDateError extends CustomError {
    constructor() {
        super(WeeklyProductErrorMessages.invalidDealDate, StatusCodes.BAD_REQUEST);
    }
}