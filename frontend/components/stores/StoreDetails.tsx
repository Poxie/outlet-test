import { Store } from "@/utils/types";
import StoreContact from "./StoreContact";
import StoreOpeningHours from "./StoreOpeningHours";
import StoreSectionHeader from "./StoreSectionHeader";
import { getStoreMapLocation } from "@/utils/storeUtils";

export default function StoreDetails({ store }: {
    store: Store;
}) {
    const mapsLink = getStoreMapLocation(store);
    return(
        <div className="border-t-[1px] border-t-secondary divide-y-[1px] divide-secondary">
            <div className="p-4 grid justify-start">
                <StoreSectionHeader>
                    Adress
                </StoreSectionHeader>
                <a
                    href={mapsLink}
                    target="_blank"
                    className="hover-underline"
                >
                    {store.address}
                </a>
            </div>
            <StoreOpeningHours store={store} className="p-4" />
            <StoreContact store={store} className="p-4" />
        </div>
    )
}