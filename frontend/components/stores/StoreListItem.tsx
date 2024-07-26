import SmallArrowIcon from "@/assets/icons/SmallArrowIcon";
import { Store } from "@/utils/types";
import StoreDetails from "./StoreDetails";
import { twMerge } from "tailwind-merge";
import { getOpenText } from "@/utils/storeUtils";

export default function StoreListItem({ store, onSelect, selected }: {
    store: Store;
    onSelect: (storeId: string) => void;
    selected: boolean;
}) {
    return(
        <div>
            <button 
                className="w-full p-4 flex justify-between items-center text-left"
                onClick={() => onSelect(store.id)}
            >
                <div>
                    <h2 className="text-lg font-medium text-c-primary">
                        {store.name}
                    </h2>
                    <span className="text-sm">
                        {getOpenText(store)}
                    </span>
                </div>
                <SmallArrowIcon 
                    className={twMerge(
                        "transition-transform",
                        selected && '-rotate-90',
                    )} 
                    size={20} 
                />
            </button>
            <div className={twMerge(
                "grid grid-rows-[0fr] overflow-hidden duration-500 transition-[grid-template-rows]",
                selected && 'grid-rows-[1fr]',
            )}>
                <div className="min-h-0">
                    <StoreDetails store={store} />
                </div>
            </div>
        </div>
    )
}