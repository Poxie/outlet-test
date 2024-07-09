import fetchFromAPI from "../fetchFromAPI";

export default function addCategoryProducts(categoryId: string, data: {
    images: string[],
    parentId: string;
}) {
    return fetchFromAPI(`/products`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}