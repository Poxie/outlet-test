export type UserRole = 'ADMINISTRATOR' | 'PERSONNEL';
export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
}
export type MutableUserProps = Pick<User, 'name' | 'email' | 'role'>;
export type WeeklyProductGroup = {
    date: string;
    week: number;
    products: WeeklyProduct[];
}
export type WeeklyProduct = {
    id: string;
    imageURL: string;
    date: string;
}
export type Category = {
    id: string;
    title: string;
    description: string;
    bannerURL: string;
    createdAt: string;
    groupCount: number;
}
export type MutableCategoryProps = Pick<Category, 'title' | 'description'> & {
    banner: string;
};

export type ProductGroup = {
    id: string;
    name: string;
    description: string;
    bannerURL: string;
    parentId: string | null;
    createdAt: string;
    productCount: number;
}
export type MutableProductGroupProps = Pick<ProductGroup, 'name' | 'description'> & {
    banner: string;
};

export type Product = {
    id: string;
    parentId: string;
    imageURL: string;
}

export type Store = {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    instagramURL: string;
    weekdayOpenHours: string;
    saturdayOpenHours: string;
    sundayOpenHours: string;
}
export type MutableStoreProps = Pick<Store, 'name' | 'address' | 'phoneNumber' | 'email'>;
export type CreateStoreProps = MutableStoreProps & {
    storeNumber: string;
}

export type AnalyticsReport = {
    totalUsers: string;
    newUsers: string;
    bounceRate: string;
    averageSessionDuration: string;
    screenPageViewsPerUser: string;
    sessionsPerUser: string;
    screenPageViews: string;
    userEngagementDuration: string;
    engagementRate: string;
    topPages: {
        pageTitle: string;
        pagePath: string;
        pageViews: string;
    }[];
}