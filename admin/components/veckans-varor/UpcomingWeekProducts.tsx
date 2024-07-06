"use client";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../section-header";
import getUpcomingWeekProducts from "@/api/weekly-products/getUpcomingWeekProducts";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Link from "next/link";
import Section from "../section";

export default function UpcomingWeekProducts() {
    const { data: weeks } = useQuery({
        queryKey: ['weekly-products', 'upcoming'],
        queryFn: getUpcomingWeekProducts,
    })

    if(!weeks) return null;

    return(
        <>
        <SectionHeader 
            title="Upcoming weeks"
            className="mt-8 mb-2"
        />
        <Section className="grid gap-2">
            {weeks.map(week => (
                <Link 
                    className="p-4 flex justify-between border-[1px] border-tertiary hover:bg-secondary transition-colors rounded-md"
                    href={`/veckans-varor/${week.date}`}
                    key={week.date}
                >
                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            Week
                            {' '}
                            {week.week}
                        </span>
                        <span className="text-sm text-muted">
                            {week.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>
                            {week.products.length} products
                        </span>
                        <ArrowIcon size={16} />
                    </div>
                </Link>
            ))}
        </Section>
        </>
    )
}