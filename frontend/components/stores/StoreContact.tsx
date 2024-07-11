import { Store } from "@/utils/types";
import StoreListSectionHeader from "./StoreListSectionHeader";
import InstagramIcon from "@/assets/icons/InstagramIcon";

export default function StoreContact({ store }: {
    store: Store;
}) {
    return(
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
                className="-m-2 p-2 hover:bg-secondary active:bg-tertiary transition-colors rounded-md text-c-primary"
                href={store.instagramURL}
                target="_blank"
                aria-label={`Följ ${store.name} på Instagram`}
            >
                <InstagramIcon size={28} />
            </a>
        </div>
    )
}