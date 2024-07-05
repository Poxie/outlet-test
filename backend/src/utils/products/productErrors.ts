import { ProductErrorMessages } from "@/constants/productErrorMessages";
import CustomError from "../errors";
import { StatusCodes } from "../errors/statusCodes";

export class ProductNotFoundError extends CustomError {
    constructor() {
        super(ProductErrorMessages.productNotFound, StatusCodes.NOT_FOUND);
    }
}