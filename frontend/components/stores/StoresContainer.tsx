"use client";
import { Store } from "@/utils/types"
import StoresList from "./StoreList";
import StoresMap from "./StoresMap";
import { useState } from "react";

export default function StoresContainer({ stores }: {
    stores: Store[];
}) {
    const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

    const onSelect = (storeId: string) => {
        if(storeId === selectedStoreId) {
            setSelectedStoreId(null);
            return;
        }
        setSelectedStoreId(storeId);
    }
    
    return(
        <div className="flex flex-col-reverse lg:flex-row border-[1px] border-tertiary rounded-md">
            <StoresList 
                stores={stores}
                selectedId={selectedStoreId}
                onSelect={onSelect}
            />
            <StoresMap 
                stores={stores}
                activeId={selectedStoreId}
            />
        </div>
    )
}