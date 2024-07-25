
import AnalyticsCardTitleSkeleton from "./AnalyticsCardTitleSkeleton";
import TextSkeleton from "./TextSkeleton";

const MOST_VISITED_PAGE_COUNT = 5;
const PAGE_CARD_TITLES = [
    'Average bounce rate',
    'Average pages visited',
    'Average sessions per user',
    'Average engagement rate',
    'Average session duration',
    'Average active time on page',
]
export default function PageEngagementSkeleton() {
    return(
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            <div className="md:col-span-2 xl:row-span-3 xl:col-span-1 divide-y-[1px] divide-secondary bg-primary border-[1px] border-tertiary rounded-md">
                <AnalyticsCardTitleSkeleton
                    title={'Most visited pages'}
                    className="p-4 border-b-[1px] border-b-tertiary"
                />
                {Array.from(Array(MOST_VISITED_PAGE_COUNT).keys()).map((i) => (
                    <div className="px-4 py-2.5 flex items-center justify-between" key={i}>
                        <TextSkeleton height={20} />
                        <TextSkeleton height={20} width={80} />
                    </div>
                ))}
            </div>
            {PAGE_CARD_TITLES.map((title) => (
                <div className="bg-primary border-[1px] border-tertiary rounded-md" key={title}>
                    <AnalyticsCardTitleSkeleton 
                        title={title}
                        className="p-4 border-b-[1px] border-b-tertiary"
                    />
                    <div className="p-4">
                        <TextSkeleton height={40} />
                    </div>
                </div>
            ))}
        </div>
    )
}