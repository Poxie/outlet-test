import getStores from "@/api/stores/getStores"
import { twMerge } from "tailwind-merge";
import StoreListItem from "./StoreListItem";

export default async function StoresList({ className }: {
    className?: string;
}) {
    const stores = await getStores();
    
    return(
        <ul className={twMerge(
            "grid gap-8",
            className,
        )}>
            {stores.map((store, index) => (
                <li key={store.id}>
                    <StoreListItem 
                        store={store}
                        reverse={index % 2 !== 0}
                    />
                </li>
            ))}
        </ul>
    )
}