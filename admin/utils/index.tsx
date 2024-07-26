import { PERSONNEL_ROLE, TEMP_PREFIX } from "./constants";
import { Category, Product, ProductGroup, Store, User, WeeklyProductGroup } from "./types";

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

export const getWeekOfYear = (date: string) => {
    const dateObj = new Date(date);
    const startOfYear = new Date(dateObj.getFullYear(), 0, 1);
    const diff = dateObj.getTime() - startOfYear.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return Math.ceil((diffDays + startOfYear.getDay() + 1) / 7);
}
export const getWeekText = (date: string) => {
    const dateObj = new Date(date);
    const today = new Date();
    const isCurrentWeek = dateObj.getTime() - today.getTime() < 0;
    return isCurrentWeek ? 'This week' : `Week ${getWeekOfYear(date)}`;
}