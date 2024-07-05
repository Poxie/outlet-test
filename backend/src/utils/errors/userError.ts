import CustomError from ".";

export class EmailTakenError extends CustomError {
    constructor() {
        super("Email is already taken", 400);
    }
}