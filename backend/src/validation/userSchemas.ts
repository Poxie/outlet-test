import { UserErrorMessages } from '@/constants/userErrorMessages';
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/utils/users/userConstants';
import { z } from 'zod';

const { nameIsRequired, maxNameLength, maxEmailLength, invalidEmailFormat, minPasswordLength, maxPasswordLength } = UserErrorMessages;

export const createUserSchema = z.object({
  name: z.string({ message: nameIsRequired })
    .max(NAME_MAX_LENGTH, { message: maxNameLength }),
  email: z.string()
    .email({ message: invalidEmailFormat })
    .max(EMAIL_MAX_LENGTH, { message: maxEmailLength }),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, { message: minPasswordLength })
    .max(PASSWORD_MAX_LENGTH, { message: maxPasswordLength }),
});