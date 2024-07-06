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
}
export type WeeklyProduct = {
    id: number;
    imageURL: string;
    date: string;
}