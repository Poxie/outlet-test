import Input from "@/components/input";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import { Store } from "@/utils/types"

export default function StoreDetails({ store, updateProps }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
}) {
    const isAdmin = useSelfIsAdmin();

    return(
        <>
        <Input 
            label="Name"
            placeholder="Store name"
            value={store.name}
            onChange={name => updateProps({ name })}
            disabled={!isAdmin}
        />
        <Input 
            containerClassName="mt-3"
            label="Address"
            placeholder="Store address"
            value={store.address}
            onChange={address => updateProps({ address })}
            textArea
            disabled={!isAdmin}
        />
        </>
    )
}