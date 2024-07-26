import Section from "../section";
import SectionHeader from "../section-header";
import TextSkeleton from "./TextSkeleton";

const CURRENT_PRODUCTS_COUNT = 4;
const UPCOMING_WEEKS_COUNT = 4;
export default function WeeklyProductsSkeleton() {
    return(
        <>
            <SectionHeader 
                title="This week's products"
                className="mb-2"
            />
            <Section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
                {Array.from({ length: CURRENT_PRODUCTS_COUNT }).map((_, i) => (
                    <div className="w-full aspect-square bg-secondary rounded-md" key={i} />
                ))}
            </Section>
            <SectionHeader 
                title="Upcoming weeks"
                className="mt-5 mb-2"
            />
            <Section className="grid gap-2">
                {Array.from({ length: UPCOMING_WEEKS_COUNT }).map((_, i) => (
                    <div className="p-4 flex items-center justify-between rounded-md border-[1px] border-secondary">
                        <TextSkeleton height={24} />
                        <TextSkeleton />
                    </div>
                ))}
            </Section>
        </>
    )
}