"use client";
import getProductsByDate from "@/api/weekly-products/getProductsByDate";
import PageBanner from "@/components/page-banner";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import { useQuery } from "@tanstack/react-query";
import WeekProducts from "./WeekProducts";
import Dropdown from "@/components/dropdown";
import getUpcomingWeekProducts from "@/api/weekly-products/getUpcomingWeekProducts";

export default function WeeksProducts({ date }: {
    date: string;
}) {
    const { data: productWeek } = useQuery({
        queryKey: ['weekly-products', date],
        queryFn: () => getProductsByDate(date),
    });
    const { data: allWeeks } = useQuery({
        queryKey: ['weekly-products'],
        queryFn: getUpcomingWeekProducts,
    })

    if(!productWeek || !allWeeks) return null;

    const dropdownItems = allWeeks.map(week => ({
        id: week.date,
        text: `Week ${week.week}`,
        href: `/veckans-varor/${week.date}`,
    }));
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
                <div className="mb-2 flex items-center justify-between">
                    <SectionHeader 
                        title={`Week ${productWeek.week}'s products`}
                    />
                    <Dropdown 
                        items={dropdownItems}
                        activeItemId={productWeek.date}
                    />
                </div>
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