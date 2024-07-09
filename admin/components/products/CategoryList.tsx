"use client";
import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Button from "../button";
import BinIcon from "@/assets/icons/BinIcon";
import { twMerge } from "tailwind-merge";
import CategoryTableRow from "./CategoryTableRow";

export default function CategoryList() {
    const { data: categories } = useQuery({
        queryKey: ["categories", 'with-counts'],
        queryFn: getCategoriesWithProductCounts,
    })

    if(!categories) return null

    return(
        <table className="w-full">
            <thead className="text-left">
                <tr>
                    <th className="w-3/5 px-5 py-4 text-sm border-b-[1px] border-b-tertiary">Category</th>
                    <th className="w-full px-5 py-4 text-sm border-b-[1px] border-b-tertiary">Assigned products</th>
                    <th className="px-5 py-4 text-sm border-b-[1px] border-b-tertiary"></th>
                </tr>
            </thead>
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