import addWeeklyProducts from "@/api/weekly-products/addWeeklyProducts";
import { useMutation } from "@tanstack/react-query";

export default function useAddWeeklyProducts() {
    return useMutation({
        mutationKey: ['add-weekly-products'],
        mutationFn: ({ date, images }: {
            date: string;
            images: string[];
        }) => addWeeklyProducts(date, images),
    })
}