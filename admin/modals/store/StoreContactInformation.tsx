import Input from "@/components/input";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import { Store } from "@/utils/types";
import { twMerge } from "tailwind-merge";

export default function StoreContactInformation({ store, updateProps, className }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
    className?: string;
}) {
    const isAdmin = useSelfIsAdmin();

    return(
        <div className={twMerge(
            "flex gap-3 flex-col",
            className,
        )}>
            <Input 
                label="Email"
                placeholder="Email address"
                value={store.email}
                onChange={email => updateProps({ email })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
            <Input 
                label="Phone number"
                placeholder="Phone number"
                value={store.phoneNumber}
                onChange={phoneNumber => updateProps({ phoneNumber })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
            <Input 
                label="Instagram"
                placeholder="Instagram URL"
                value={store.instagramURL}
                onChange={instagramURL => updateProps({ instagramURL })}
                containerClassName="flex-1"
                disabled={!isAdmin}
            />
        </div>
    )
}