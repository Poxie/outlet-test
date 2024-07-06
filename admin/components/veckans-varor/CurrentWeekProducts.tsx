"use client";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../section-header";
import getCurrentWeekProducts from "@/api/weekly-products/getCurrentWeekProducts";
import Image from "next/image";
import { getCurrentDealDateString } from "@/utils";
import Section from "../section";

export default function CurrentWeekProducts() {
    const { data: products, isLoading } = useQuery({
        queryKey: ['weekly-products', 'current'],
        queryFn: getCurrentWeekProducts,
    })

    if(isLoading || !products) return null;

    return(
        <>
            <SectionHeader 
                title="This week's products"
                buttonText="Edit products"
                buttonHref={`/veckans-varor/${getCurrentDealDateString()}`}
                className="mb-2"
            />
            <Section className="grid grid-cols-8 gap-2">
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
            </Section>
        </>
    )
}