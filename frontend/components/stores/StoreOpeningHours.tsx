import { Store } from "@/utils/types";
import StoreSectionHeader from "./StoreSectionHeader";
import { twMerge } from "tailwind-merge";

export default function StoreOpeningHours({ store, className }: {
    store: Store;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex flex-col",
            className,
        )}>
            <StoreSectionHeader>
                Öppettider
            </StoreSectionHeader>
            <span>
                Vardag {store.weekdayOpenHours}
            </span>
            <span>
                Lördag {store.saturdayOpenHours}
            </span>
            <span>
                Söndag {store.sundayOpenHours}
            </span>
        </div>
    )
}