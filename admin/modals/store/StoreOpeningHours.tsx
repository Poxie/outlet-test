import Input from "@/components/input";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import { Store } from "@/utils/types";
import { twMerge } from "tailwind-merge";

export default function StoreOpeningHours({ store, updateProps, className }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
    className?: string;
}) {
    const isAdmin = useSelfIsAdmin();

    return(
        <div className={twMerge(
            "flex flex-col gap-3",
            className,
        )}>
            <Input 
                label="Weekdays"
                placeholder="Weekday opening hours"
                value={store.weekdayOpenHours}
                onChange={weekdayOpenHours => updateProps({ weekdayOpenHours })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
            <Input 
                label="Saturdays"
                placeholder="Saturday opening hours"
                value={store.saturdayOpenHours}
                onChange={saturdayOpenHours => updateProps({ saturdayOpenHours })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
            <Input 
                label="Sundays"
                placeholder="Saturday opening hours"
                value={store.sundayOpenHours}
                onChange={sundayOpenHours => updateProps({ sundayOpenHours })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
        </div>
    )
}