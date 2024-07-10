import SectionHeader from "../section-header";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Link from "next/link";
import Section from "../section";
import getAllWeekProducts from "@/api/weekly-products/getAllWeekProducts";
import { WeeklyProductGroup } from "@/utils/types";

export default function UpcomingWeekProducts({ weeks }: {
    weeks: WeeklyProductGroup[];
}) {
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
                    <div className="flex items-center sm:gap-2 flex-col sm:flex-row">
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