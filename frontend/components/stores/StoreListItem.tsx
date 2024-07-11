import { getStoreIframeSrc, getStoreMapImage } from "@/utils/storeUtils";
import { Store } from "@/utils/types";
import { twMerge } from "tailwind-merge";
import StoreContact from "./StoreContact";
import StoreOpeningHours from "./StoreOpeningHours";
import StoreInformation from "./StoreInformation";
import StoreImage from "./StoreImage";

export default function StoreListItem({ store, reverse }: {
    store: Store;
    reverse: boolean;
}) {
    const iframeSrc = getStoreIframeSrc(store);
    const storeImageSrc = getStoreMapImage(store);

    return(
        <div 
            data-store-id={store.id}
            className={twMerge(
                "md:flex border-[1px] border-tertiary rounded-md overflow-hidden flex-row",
                reverse && "flex-row-reverse",
            )}
        >
            <div className="flex-1">
                <div className="p-5 flex flex-col items-start border-b-[1px] border-tertiary">
                    <StoreInformation store={store} />
                </div>
                <div className="p-5 grid gap-4">
                    <StoreOpeningHours store={store} />
                    <StoreContact store={store} />
                </div>
            </div>
            <div className="flex-1">
                <StoreImage 
                    imageSrc={storeImageSrc}
                    iframeSrc={iframeSrc}
                />
            </div>
        </div>
    )
}