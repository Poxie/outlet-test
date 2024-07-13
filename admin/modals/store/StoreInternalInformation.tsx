import Input from "@/components/input";
import { Store } from "@/utils/types";

export default function StoreInternalInformation({ className, storeNumber, updateProps, canEditStoreNumber }: {
    storeNumber: string;
    canEditStoreNumber: boolean;
    updateProps: (changes: Partial<Store>) => void;
    className?: string;
}) {
    return(
        <Input 
            placeholder="Store number"
            label="Store number"
            value={storeNumber}
            onChange={storeNumber => updateProps({ id: storeNumber })}
            disabled={!canEditStoreNumber}
            containerClassName={className}
        />
    )
}