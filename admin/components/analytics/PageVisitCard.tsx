import AnalyticsCardTitle from "./AnalyticsCardTitle";

export default function PageVisitCard({ title, userCount }: {
    title: string;
    userCount: string;
}) {
    return(
        <div className="p-5 flex justify-between items-center">
            <AnalyticsCardTitle title={title} />
            <span className="text-4xl font-semibold">
                {userCount}
            </span>
        </div>
    )
}