import { UserErrorMessages } from '@/constants/userErrorMessages';
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USER_ROLES } from '@/utils/users/userConstants';
import { z } from 'zod';

const { 
    nameIsRequired, minNameLength, maxNameLength, 
    maxEmailLength, invalidEmailFormat, emailIsRequired,
    minPasswordLength, maxPasswordLength, passwordIsRequired,
    invalidRole,
} = UserErrorMessages;

export const createUserSchema = z.object({
  name: z.string({ message: nameIsRequired })
    .min(NAME_MIN_LENGTH, { message: minNameLength })
    .max(NAME_MAX_LENGTH, { message: maxNameLength }),
  email: z.string({ message: emailIsRequired })
    .email({ message: invalidEmailFormat })
    .max(EMAIL_MAX_LENGTH, { message: maxEmailLength }),
  password: z.string({ message: passwordIsRequired })
    .min(PASSWORD_MIN_LENGTH, { message: minPasswordLength })
    .max(PASSWORD_MAX_LENGTH, { message: maxPasswordLength }),
  role: z.enum(USER_ROLES, {
    message: invalidRole,
  }).optional(),
});