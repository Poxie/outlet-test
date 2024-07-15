import Section from "../section";
import AnalyticsCardTitle from "./AnalyticsCardTitle";

export default function PageEngagementCard({ children, title }: {
    title: string;
    children: React.ReactNode;
}) {
    return(
        <Section className="p-0">
            <AnalyticsCardTitle
                title={title}
                className="p-4 border-b-[1px] border-b-tertiary"
            />
            <div className="p-4">
                {typeof children === 'string' && (
                    <span className="text-4xl font-semibold">
                        {children}
                    </span>
                )}
                {typeof children !== 'string' && children}
            </div>
        </Section>
    )
}