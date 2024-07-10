import Input from "@/components/input";
import { Store } from "@/utils/types";

export default function StoreContactInformation({ store, updateProps }: {
    store: Store;
    updateProps: (changes: Partial<Store>) => void;
}) {
    return(
        <div className="flex gap-3">
            <Input 
                label="Email"
                placeholder="Email address"
                value={store.email}
                onChange={email => updateProps({ email })}
                containerClassName="flex-1"
            />
            <Input 
                label="Phone number"
                placeholder="Phone number"
                value={store.phoneNumber}
                onChange={phoneNumber => updateProps({ phoneNumber })}
                containerClassName="flex-1"
            />
        </div>
    )
}