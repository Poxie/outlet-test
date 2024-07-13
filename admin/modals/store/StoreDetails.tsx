import Input from "@/components/input";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import { Store } from "@/utils/types"
import { twMerge } from "tailwind-merge";

export default function StoreDetails({ className, store, updateProps, withStoreNumber }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
    withStoreNumber?: boolean;
    className?: string;
}) {
    const isAdmin = useSelfIsAdmin();

    return(
        <div className={twMerge(
            "grid gap-3",
            className,
        )}>
            <Input 
                label="Name"
                placeholder="Store name"
                value={store.name}
                onChange={name => updateProps({ name })}
                disabled={!isAdmin}
            />
            <Input 
                label="Address"
                placeholder="Store address"
                value={store.address}
                onChange={address => updateProps({ address })}
                textArea
                disabled={!isAdmin}
            />
            {withStoreNumber && (
                <Input 
                    label="Store number"
                    placeholder="Store number"
                    onChange={() => {}}
                    value={store.id}
                    disabled={true}
                />
            )}
        </div>
    )
}