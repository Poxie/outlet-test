import { Store } from "@/utils/types";
import StoreListSectionHeader from "./StoreListSectionHeader";
import { getStoreMapLocation, getStoreIframeSrc, getStoreMapImage } from "@/utils/storeUtils";
import StoreListItemImage from "./StoreListItemImage";
import { twMerge } from "tailwind-merge";
import InstagramIcon from "@/assets/icons/InstagramIcon";

export default function StoreListItem({ store, reverse }: {
    store: Store;
    reverse: boolean;
}) {
    const directions = getStoreMapLocation(store);
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
                    <h2 className="text-2xl text-c-primary font-medium">
                        {store.name}
                    </h2>
                    <a
                        className="hover:underline hover:text-c-primary"
                        href={directions}
                        target="_blank"
                    >
                        <pre 
                            className="mt-1 font-[inherit] text-wrap"
                        >
                            {store.address}
                        </pre>
                    </a>
                </div>
                <div className="p-5 grid gap-4">
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
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col items-start">
                            <StoreListSectionHeader>
                                Kontakt
                            </StoreListSectionHeader>
                            <span>
                                Tel:
                                {' '}
                                <a 
                                    href={`Tel: ${store.phoneNumber}`}
                                    className="hover-underline"
                                >
                                    {store.phoneNumber}
                                </a>
                            </span>
                            <a 
                                href={`mailto:${store.email}`}
                                className="hover-underline"
                            >
                                Maila {store.name}
                            </a>
                        </div>
                        <a
                            className="-m-2 p-2 hover:bg-secondary transition-colors rounded-md text-c-primary"
                            href={store.instagramURL}
                            target="_blank"
                            aria-label={`Följ ${store.name} på Instagram`}
                        >
                            <InstagramIcon size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <StoreListItemImage 
                    imageSrc={storeImageSrc}
                    iframeSrc={iframeSrc}
                />
            </div>
        </div>
    )
}