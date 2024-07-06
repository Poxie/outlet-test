import { LoginErrorMessages } from "@/constants/loginErrorMessages";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ 
        message: LoginErrorMessages.EMAIL_REQUIRED 
    }).min(1, {
        message: LoginErrorMessages.EMAIL_REQUIRED
    }),
    password: z.string({
        message: LoginErrorMessages.PASSWORD_REQUIRED
    }).min(1, {
        message: LoginErrorMessages.PASSWORD_REQUIRED
    }),
})