"use client";
import PageBanner from "@/components/page-banner";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import { useQuery } from "@tanstack/react-query";
import WeekProducts from "./WeekProducts";
import Dropdown from "@/components/dropdown";
import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import { WeeklyProductGroup } from "@/utils/types";

export default function WeeksProducts({ date }: {
    date: string;
}) {
    const { data: allWeeks } = useQuery({
        queryKey: ['weekly-products', 'all'],
        queryFn: getAllWeekProducts,
    })

    if(!allWeeks) return null;

    const productWeek = allWeeks.find(week => week.date === date);
    if(!productWeek) return null;

    const getWeekText = (week: WeeklyProductGroup) => {
        const dateObj = new Date(week.date);
        const today = new Date();
        const isCurrentWeek = dateObj.getTime() - today.getTime() < 0;
        return isCurrentWeek ? 'This week' : `Week ${week.week}`;
    }

    const dropdownItems = allWeeks.map(week => ({
        id: week.date,
        text: getWeekText(week),
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
                        title={`${getWeekText(productWeek)}'s products`}
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