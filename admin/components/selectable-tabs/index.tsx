import { twMerge } from "tailwind-merge";

export type SelectableTab<T> = {
    id: T;
    text: string;
}
export default function SelectableTabs<T extends string>({ className, tabs, activeTab, onChange }: {
    tabs: SelectableTab<T>[];
    activeTab: string;
    onChange: (tab: T) => void;
    className?: string;
}) {
    return(
        <ul className={twMerge(
            "flex gap-4 border-b-[1px] border-b-tertiary",
            className,
        )}>
            {tabs.map(tab => (
                <li key={tab.id}>
                    <button
                        className={twMerge(
                            "py-3 text-sm text-muted hover:text-primary border-b-[1px] border-b-transparent transition-colors",
                            tab.id === activeTab && "text-primary border-b-text-primary",
                        )}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.text}
                    </button>
                </li>
            ))}
        </ul>
    )
}