export type User = {
    name: string;
    email: string;
}
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
export type ProductCategory = {
    id: string;
    title: string;
    description: string;
    bannerURL: string;
    productCount: number;
}
type Product = {
    id: string;
    parentId: string;
    imageURL: string;
}
export type CategoryWithProducts = ProductCategory & {
    products: Product[];
}