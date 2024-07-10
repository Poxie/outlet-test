import getStores from "@/api/stores/getStores"
import { twMerge } from "tailwind-merge";
import StoreChip from "./StoreChip";

export default async function AllStoresChips({ className }: {
    className?: string;
}) {
    const stores = await getStores();
    
    return(
        <ul className={twMerge(
            "[--items-per-row:2] sm:[--items-per-row:3] md:[--items-per-row:5] [--item-gap:.5rem] flex flex-wrap gap-[--item-gap]",
            className,
        )}>
            {stores.map(store => (
                <li 
                    className="flex-[calc((100%/var(--items-per-row))-(var(--items-per-row)-1)*var(--item-gap))]"
                    key={store.id}
                >
                    <StoreChip store={store} />
                </li>
            ))}
        </ul>
    )
}