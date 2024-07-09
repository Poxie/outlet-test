import { EMAIL_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/utils/users/userConstants";

export const UserErrorMessages = {
    nameIsRequired: "Name is required",
    minNameLength: `Name must be at least ${NAME_MIN_LENGTH} characters long`,
    maxNameLength: `Name must be less than ${NAME_MAX_LENGTH} characters`,
    emailIsRequired: "Email is required",
    invalidEmailFormat: "Invalid email format",
    maxEmailLength: `Email must be less than ${EMAIL_MAX_LENGTH} characters`,
    passwordIsRequired: "Password is required",
    minPasswordLength: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    maxPasswordLength: `Password must be at least ${PASSWORD_MAX_LENGTH} characters long`,
    invalidRole: "Invalid role",

    userNotFound: "User not found",
    emailTaken: "Email is already taken",
};