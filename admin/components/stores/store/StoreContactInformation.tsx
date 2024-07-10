import Input from "@/components/input";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import { Store } from "@/utils/types";

export default function StoreContactInformation({ store, updateProps }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
}) {
    const isAdmin = useSelfIsAdmin();

    return(
        <div className="flex gap-3 flex-col md:flex-row">
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
        </div>
    )
}