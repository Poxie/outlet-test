"use client";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../section-header";
import getCurrentWeekProducts from "@/api/weekly-products/getCurrentWeekProducts";
import Image from "next/image";
import { getCurrentDealDateString } from "@/utils";

export default function CurrentWeekProducts() {
    const { data: products, isLoading } = useQuery({
        queryKey: ['weekly-products', 'current'],
        queryFn: getCurrentWeekProducts,
    })

    if(isLoading || !products) return null;

    return(
        <div>
            <SectionHeader 
                title="This week's products"
                buttonText="Edit products"
                buttonHref={`/veckans-varor/${getCurrentDealDateString()}`}
                className="mb-2"
            />
            <div className="p-5 grid grid-cols-8 gap-2 bg-primary rounded-md">
                {products.map(product => (
                    <Image 
                        alt=""
                        width={200}
                        height={200}
                        src={product.imageURL}
                        className="w-full"
                        key={product.id}
                    />
                ))}
            </div>
        </div>
    )
}