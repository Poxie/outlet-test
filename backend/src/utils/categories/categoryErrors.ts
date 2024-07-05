import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";

export class CategoryNotFound extends CustomError {
    constructor() {
        super('Category not found', StatusCodes.NOT_FOUND);
    }
}