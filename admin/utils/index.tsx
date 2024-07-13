import { PERSONNEL_ROLE, TEMP_PREFIX } from "./constants";
import { CategoryWithProducts, Product, Store, User } from "./types";

// Fucntions to get dummy objects
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
    createdAt: new Date().getTime().toString(),
})
export const getEmptyStoreObject: () => Store = () => ({
    id: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    instagramURL: '',
    weekdayOpenHours: '',
    saturdayOpenHours: '',
    sundayOpenHours: '',
    createdAt: new Date().getTime().toString(),
})
export const getEmptyProductObject: (props?: Partial<Product>) => Product = (props = {}) => ({
    id: `${TEMP_PREFIX}${Math.random()}`,
    parentId: '',
    imageURL: '',
    ...props,
})

// Get readable string from date
export function getReadableDate(date: string) {
    return new Date(parseInt(date)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}