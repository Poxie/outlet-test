import SectionHeader from "../section-header";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Section from "../section";
import { WeeklyProductGroup } from "@/utils/types";
import { useModal } from "@/contexts/modal";
import WeeklyProductsModal from "@/modals/weekly-products";

export default function UpcomingWeekProducts({ weeks }: {
    weeks: WeeklyProductGroup[];
}) {
    const { setModal } = useModal();

    const openEditModal = (date: string) => setModal(<WeeklyProductsModal date={date} />);

    return(
        <>
        <SectionHeader 
            title="Upcoming weeks"
            className="mt-8 mb-2"
        />
        <Section className="grid gap-2">
            {weeks.map(week => (
                <button 
                    className="p-4 flex justify-between border-[1px] border-tertiary hover:bg-secondary transition-colors rounded-md"
                    onClick={() => openEditModal(week.date)}
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
                            {week.group.productCount} products
                        </span>
                        <ArrowIcon size={16} />
                    </div>
                </button>
            ))}
        </Section>
        </>
    )
}