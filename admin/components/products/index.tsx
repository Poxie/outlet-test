"use client";

import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const { data: categories } = useQuery({
        queryKey: ["categories", 'with-counts'],
        queryFn: getCategoriesWithProductCounts,
    })

    if(!categories) return null;

    return(
        <main>
            {categories.map(category => category.title)}
        </main>
    )
}