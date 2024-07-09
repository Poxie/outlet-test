export const USER_ID_LENGTH = 8;

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 70;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 80;

export const ADMIN_ROLE = 'ADMINISTRATOR';
export const PERSONNEL_ROLE = 'PERSONNEL';
export const USER_ROLES = [ADMIN_ROLE, PERSONNEL_ROLE] as const;