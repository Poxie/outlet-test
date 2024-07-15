import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";

export class ProductGroupNotFoundError extends CustomError {
    constructor() {
        super('Product group not found', StatusCodes.NOT_FOUND);
    }
}