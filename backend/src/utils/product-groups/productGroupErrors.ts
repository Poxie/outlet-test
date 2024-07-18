import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";

export class ProductGroupNotFoundError extends CustomError {
    constructor() {
        super('Product group not found', StatusCodes.NOT_FOUND);
    }
}

export class ProductPositionError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}