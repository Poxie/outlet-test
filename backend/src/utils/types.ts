import { Product, ProductGroup, Store, User } from "@prisma/client";

export type ProductGroupWithProducts = ProductGroup & { products: Product[] };

export type MutableUserProps = Pick<User, 'name' | 'email' | 'password' | 'role'>;
export type MutableStoreProps = Pick<Store, 'name' | 'address' | 'phoneNumber' | 'email'>;
export type MutableProductGroupProps = Pick<ProductGroup, 'name' | 'description' | 'bannerURL'>;
export type MutableCategoryProps = Pick<ProductGroup, 'name' | 'description' | 'bannerURL'>;

export type ProductListItem = {
    id: string;
    header: {
        title: string;
        description: string;
        bannerURL: string;
        path: string;
    };
    groups: ProductGroup[];
    hasCategory: boolean;
}
type ProductPageHeader = {
    title: string;
    description: string;
    bannerURL: string;
}
export type ProductPage = {
    header: ProductPageHeader;
    groups: ProductGroupWithProducts[];
}

// Helper types
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;