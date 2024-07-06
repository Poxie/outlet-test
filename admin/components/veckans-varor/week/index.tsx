"use client";
import getProductsByDate from "@/api/weekly-products/getProductsByDate";
import PageBanner from "@/components/page-banner";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import { useQuery } from "@tanstack/react-query";
import WeekProducts from "./WeekProducts";

export default function WeeksProducts({ date }: {
    date: string;
}) {
    const { data: productWeek } = useQuery({
        queryKey: ['weekly-products', date],
        queryFn: () => getProductsByDate(date),
    })

    if(!productWeek) return null;

    return(
        <main>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Veckans varor', href: '/veckans-varor' },
                    { text: `Week ${productWeek.week}`, href: `/veckans-varor/${productWeek.date}` },
                ]}
            />
            <div className="p-5">
                <SectionHeader 
                    title={`Week ${productWeek.week}'s products`}
                    className="mb-2"
                />
                <Section>
                    <WeekProducts 
                        products={productWeek.products}
                        date={date}
                    />
                </Section>
            </div>
        </main>
    )
}