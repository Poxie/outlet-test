import { getAllStoresIframeSrc, getStoreIframeSrc } from "@/utils/storeUtils";
import { Store } from "@/utils/types"

export default function StoresMap({ stores, activeId }: {
    stores: Store[];
    activeId: string | null;
}) {
    const activeStore = stores.find(store => store.id === activeId);

    const mapsSrc = activeStore ? getStoreIframeSrc(activeStore) : getAllStoresIframeSrc();
    return(
        <div className="flex-1 aspect-video">
            <iframe 
                src={mapsSrc}
                className="w-full h-full"
            />
        </div>
    )
}