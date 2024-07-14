"use client";
import getCategoriesWithProducts from "@/api/products/getCategoriesWithProducts"
import { useQuery } from "@tanstack/react-query"
import HomeProductRow from "./HomeProductRow"

export default function HomeProductList() {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesWithProducts,
    })
    if(!categories) return null;

    return(
        categories.map(category => (
            <HomeProductRow 
                category={category}
                key={category.id}
            />
        ))
    )
}