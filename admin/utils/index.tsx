import { PERSONNEL_ROLE } from "./constants";
import { User } from "./types";

export const getEmptyUser: () => User = () => ({
    id: '1',
    name: '',
    email: '',
    role: PERSONNEL_ROLE,
    createdAt: Date.now().toString(),
})
export const getUserWithPassword = (defaultUser?: User) => ({
    ...(defaultUser || getEmptyUser()),
    password: '',
    repeatPassword: '',
})