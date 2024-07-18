import fetchFromAPI from "../fetchFromAPI";

export default function updateProductPositions(parentId: string, positions: {
    id: string;
    position: number;
}[]) {
    return fetchFromAPI('/products/positions', {
        method: 'PATCH',
        body: JSON.stringify({ 
            parentId,
            positions,
        }),
    })
}