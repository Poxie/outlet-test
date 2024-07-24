export type Category = {
    id: string,
    title: string;
    description: string;
    bannerURL: string;
    groups: ProductGroup[];
}
export type Product = {
    id: string;
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
    id: string;
    imageURL: string;
    date: string;
    // These dont exist yet, add them later
    position: number;
    parentId: string;
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
    productCount: number;
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

export type ProductPage = {
    header: {
        title: string;
        description: string;
        bannerURL: string;
    };
    groups: ProductGroup[];
}