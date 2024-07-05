import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/utils/users/userConstants";

export const UserErrorMessages = {
    nameIsRequired: "Name is required",
    maxNameLength: `Name must be less than ${NAME_MAX_LENGTH} characters`,
    invalidEmailFormat: "Invalid email format",
    maxEmailLength: `Email must be less than ${EMAIL_MAX_LENGTH} characters`,
    minPasswordLength: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    maxPasswordLength: `Password must be at least ${PASSWORD_MAX_LENGTH} characters long`,
};