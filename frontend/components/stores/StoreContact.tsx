import { Store } from "@/utils/types";
import StoreSectionHeader from "./StoreSectionHeader";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import { twMerge } from "tailwind-merge";

export default function StoreContact({ store, className }: {
    store: Store;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex items-end justify-between",
            className,
        )}>
            <div className="flex flex-col items-start">
                <StoreSectionHeader>
                    Kontakt
                </StoreSectionHeader>
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