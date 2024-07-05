export type Category = {
    id: string,
    title: string;
    description: string;
    products: Product[];
}
export type Product = {
    id: number,
    parentId: string;
    imageURL: string;
}