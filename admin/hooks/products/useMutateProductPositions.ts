import updateProductPositions from "@/api/products/updateProductPositions";
import { useMutation } from "@tanstack/react-query"

export default function useMutateProductPositions(parentId: string) {
    return useMutation({
        mutationKey: ['products', 'positions'],
        mutationFn: (positions: {
            id: string;
            position: number;
        }[]) => updateProductPositions(parentId, positions),
    })
}