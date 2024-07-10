import Input from "@/components/input";
import { Store } from "@/utils/types"

export default function StoreDetails({ store, updateProps }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
}) {
    return(
        <>
        <Input 
            label="Store name"
            value={store.name}
            onChange={name => updateProps({ name })}
        />
        <Input 
            containerClassName="mt-3"
            label="Address"
            value={store.address}
            onChange={address => updateProps({ address })}
            textArea
        />
        </>
    )
}