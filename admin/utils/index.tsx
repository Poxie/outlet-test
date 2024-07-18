import { PERSONNEL_ROLE, TEMP_PREFIX } from "./constants";
import { Category, Product, ProductGroup, Store, User } from "./types";

// Fucntions to get dummy objects
export const getEmptyUserObject: () => User = () => ({
    id: 'temp-id',
    name: '',
    email: '',
    role: PERSONNEL_ROLE,
    createdAt: new Date().getTime().toString(),
})
export const getEmptyCategoryObject: () => Category = () => ({
    id: 'temp-id',
    title: '',
    description: '',
    bannerURL: '',
    createdAt: new Date().getTime().toString(),
    groupCount: 0,
})
export const getEmptyProductGroupObject: () => ProductGroup = () => ({
    id: 'temp-id',
    name: '',
    description: '',
    bannerURL: '',
    parentId: '',
    productCount: 0,
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
    position: 0,
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

// Get readable role from role string
export function getReadableRole(role: string) {
    return role.slice(0,1) + role.slice(1).toLowerCase();
}