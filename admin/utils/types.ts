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
    group: ProductGroup & {
        products: Product[];
    };
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
export type CreateCategoryProps = Pick<Category, 'title' | 'description'> & {
    banner: string;
}

export type CreateProductGroupProps = Pick<ProductGroup, 'name' | 'description'> & {
    banner: string;
    parentId: string | null;
};
export type MutableCategoryProps = Pick<Category, 'title' | 'description'> & {
    banner: string;
};

export type ProductGroupType = 'WEEKLY_PRODUCT' | 'PRODUCT_GROUP' | 'BLOG';
export type ProductGroup = {
    id: string;
    name: string;
    description: string;
    bannerURL: string;
    parentId: string | null;
    createdAt: string;
    productCount: number;
    groupType: ProductGroupType;
}
export type MutableProductGroupProps = Pick<ProductGroup, 'name' | 'description'> & {
    banner: string;
};

export type Product = {
    id: string;
    parentId: string;
    imageURL: string;
    position: number;
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