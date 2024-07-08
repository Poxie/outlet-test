"use client";
import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Button from "../button";
import BinIcon from "@/assets/icons/BinIcon";
import { twMerge } from "tailwind-merge";

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
                    <th className="px-5 py-4 text-sm border-b-[1px] border-b-tertiary">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y-[1px] divide-secondary">
                {categories.map(category => (
                    <tr 
                        className="group hover:bg-secondary transition-colors"
                        key={category.id}
                    >
                        <td className="p-5">
                            <div className="flex gap-3">
                                <Image 
                                    className="object-cover aspect-video rounded-md"
                                    src={category.bannerURL}
                                    width={98}
                                    height={63}
                                    alt=""
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        {category.title}
                                    </span>
                                    <span className="text-sm text-muted line-clamp-2">
                                        {category.description}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className="p-5">
                            {category.productCount} products
                        </td>
                        <td className="p-5">
                            <div className="flex items-center gap-2 text-nowrap">
                                <Button 
                                    className={twMerge(
                                        "px-3.5 py-2.5",
                                        "group-hover:bg-tertiary group-hover:hover:bg-quaternary"
                                    )}
                                    href={`/produkter/${category.id}`}
                                    type="secondary"
                                >
                                    Edit category
                                </Button>
                                <button 
                                    className="p-2.5 rounded-md hover:bg-c-primary/15 transition-colors"
                                    aria-label="Delete category"
                                >
                                    <BinIcon size={24} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}