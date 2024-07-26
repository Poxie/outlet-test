"use client";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../page-banner";
import CurrentWeekProducts from "./CurrentWeekProducts";
import UpcomingWeekProducts from "./UpcomingWeekProducts";
import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import WeeklyProducts from "./WeeklyProducts";

export default function VeckansVaror() {
    const { data: weeks, isPending } = useQuery({
        queryKey: ['products', 'weekly'],
        queryFn: getAllWeekProducts,
    })

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Veckans varor', href: '/veckans-varor' },
            ]}
        />
        <main className="p-5">
            <WeeklyProducts 
                weeks={weeks || []}
                loading={isPending}
            />
        </main>
        </>
    )
}