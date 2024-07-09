import { PERSONNEL_ROLE } from "./constants";
import { User } from "./types";

export const getEmptyUserObject: () => User = () => ({
    id: 'temp-id',
    name: '',
    email: '',
    role: PERSONNEL_ROLE,
    createdAt: new Date().getTime().toString(),
})