import { PERSONNEL_ROLE } from "./constants";
import { CategoryWithProducts, User } from "./types";

export const getEmptyUserObject: () => User = () => ({
    id: 'temp-id',
    name: '',
    email: '',
    role: PERSONNEL_ROLE,
    createdAt: new Date().getTime().toString(),
})
export const getEmptyCategoryObject: () => CategoryWithProducts = () => ({
    id: 'temp-id',
    title: '',
    description: '',
    bannerURL: '',
    productCount: 0,
    products: [],
})