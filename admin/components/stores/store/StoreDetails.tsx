import Input from "@/components/input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ADMIN_ROLE } from "@/utils/constants";
import { Store } from "@/utils/types"

export default function StoreDetails({ store, updateProps }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
}) {
    const { data: currentUser } = useCurrentUser();

    const isAdmin = currentUser?.role === ADMIN_ROLE;
    return(
        <>
        <Input 
            label="Store name"
            value={store.name}
            onChange={name => updateProps({ name })}
            disabled={!isAdmin}
        />
        <Input 
            containerClassName="mt-3"
            label="Address"
            value={store.address}
            onChange={address => updateProps({ address })}
            textArea
            disabled={!isAdmin}
        />
        </>
    )
}