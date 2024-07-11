import { getStoreMapLocation } from "@/utils/storeUtils";
import { Store } from "@/utils/types"

export default function StoreInformation({ store }: {
    store: Store;
}) {
    const directions = getStoreMapLocation(store);

    return(
        <>
        <h2 className="text-2xl text-c-primary font-medium">
            {store.name}
        </h2>
        <a
            className="hover:underline hover:text-c-primary"
            href={directions}
            target="_blank"
        >
            <pre 
                className="mt-1 font-[inherit] text-wrap"
            >
                {store.address}
            </pre>
        </a>
        </>
    )
}