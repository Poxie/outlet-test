import removeWeeklyProducts from "@/api/weekly-products/removeWeeklyProducts";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveWeeklyProducts() {
    return useMutation({
        mutationKey: ['remove-weekly-products'],
        mutationFn: ({ productIds }: {
            productIds: string[];
        }) => removeWeeklyProducts(productIds),
    })
}