"use client";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../page-banner";
import CurrentWeekProducts from "./CurrentWeekProducts";
import UpcomingWeekProducts from "./UpcomingWeekProducts";
import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";

export default function VeckansVaror() {
    const { data: allWeeks } = useQuery({
        queryKey: ['weekly-products', 'all'],
        queryFn: getAllWeekProducts,
    })

    if(!allWeeks) return null;

    return(
        <main>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Veckans varor', href: '/veckans-varor' },
                ]}
            />
            <div className="p-5">
                <CurrentWeekProducts 
                    week={allWeeks[0]}
                />
                <UpcomingWeekProducts 
                    weeks={allWeeks.slice(1)}
                />
            </div>
        </main>
    )
}