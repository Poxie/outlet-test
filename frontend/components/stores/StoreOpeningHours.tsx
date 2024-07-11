import { Store } from "@/utils/types";
import StoreListSectionHeader from "./StoreListSectionHeader";

export default function StoreOpeningHours({ store }: {
    store: Store;
}) {
    return(
        <div className="flex flex-col">
            <StoreListSectionHeader>
                Öppettider
            </StoreListSectionHeader>
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