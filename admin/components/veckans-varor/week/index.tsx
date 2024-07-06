"use client";
import getProductsByDate from "@/api/weekly-products/getProductsByDate";
import PageBanner from "@/components/page-banner";
import { useQuery } from "@tanstack/react-query";

export default function WeeksProducts({ params: { date } }: {
    params: { date: string };
}) {
    const { data: productWeek } = useQuery({
        queryKey: ['weeklyProducts', date],
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
        </main>
    )
}