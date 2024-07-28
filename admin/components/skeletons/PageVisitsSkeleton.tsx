import Section from "../section";
import AnalyticsCardTitleSkeleton from "./AnalyticsCardTitleSkeleton";
import TextSkeleton from "./TextSkeleton";

const PAGE_VISIT_CARD_TITLES = [
    'Total visitors',
    'Returning visitors',
    'New visitors',
]
export default function PageVisitsSkeleton() {
    return(
        <Section className="p-0 grid md:grid-cols-2 xl:grid-cols-3 divide-y-[1px] divide-x-[1px] divide-tertiary">
            {PAGE_VISIT_CARD_TITLES.map((title, index) => (
                <div
                    className="p-5 flex justify-between items-center md:first:col-span-2 xl:first:col-span-1"
                    key={index}
                >
                    <AnalyticsCardTitleSkeleton 
                        title={title}
                    />
                    <TextSkeleton 
                        height={40}
                    />
                </div>
            ))}
        </Section>
    )
}