"use client";
import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts"
import { useQuery } from "@tanstack/react-query"
import CategoryTableRow from "./CategoryTableRow";
import CategoryTableHead from "./CategoryTableHead";

export default function CategoryTable() {
    const { data: categories } = useQuery({
        queryKey: ["categories", 'with-counts'],
        queryFn: getCategoriesWithProductCounts,
    })

    if(!categories) return null

    return(
        <table className="w-full">
            <CategoryTableHead />
            <tbody className="divide-y-[1px] divide-secondary">
                {categories.map(category => (
                    <CategoryTableRow 
                        category={category}
                        key={category.id}
                    />
                ))}
            </tbody>
        </table>
    )
}