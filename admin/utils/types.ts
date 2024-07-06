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