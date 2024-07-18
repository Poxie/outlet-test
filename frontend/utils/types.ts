export type Category = {
    id: string,
    title: string;
    description: string;
    bannerURL: string;
    products: Product[];
}
export type Product = {
    id: number,
    parentId: string;
    imageURL: string;
    position: number;
}
export type WeeklyGroup = {
    date: string;
    week: number;
    products: WeeklyProduct[];
}
export type WeeklyProduct = {
    id: number;
    imageURL: string;
    date: string;
}
export type Store = {
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    instagramURL: string;
    weekdayOpenHours: string;
    saturdayOpenHours: string;
    sundayOpenHours: string;
}

export type ProductGroup = {
    id: string;
    name: string;
    description: string;
    bannerURL: string;
    products: Product[];
}
export type ProductListHeader = {
    title: string;
    description: string;
    bannerURL: string;
    path: string;
}
export type ProductListItem = {
    header: ProductListHeader;
    id: string;
    groups: ProductGroup[];
    hasCategory: boolean;
}