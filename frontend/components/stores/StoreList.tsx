import SearchIcon from "@/assets/icons/SearchIcon";
import Input from "../input";
import StoreListItem from "./StoreListItem";
import { Store } from "@/utils/types";
import { useState } from "react";

export default function StoresList({ stores, onSelect, selectedId }: {
    stores: Store[];
    onSelect: (storeId: string) => void;
    selectedId: string | null;
}) {
    const [search, setSearch] = useState('');

    const filteredStores = stores.filter(store => store.name.toLowerCase().includes(search.toLowerCase()));

    return(
        <div className="w-[400px] overflow-hidden flex flex-col">
            <Input 
                onChange={setSearch}
                icon={<SearchIcon size={20} />}
                containerClassName="border-b-[1px] border-tertiary rounded-none"
                className="rounded-md"
                placeholder="Sök efter varuhus"
            />
            {filteredStores.length !== 0 && (
                <ul className="scrollbar flex flex-col divide-y-[1px] divide-secondary overflow-auto">
                    {filteredStores.map((store, index) => (
                        <li key={store.id}>
                            <StoreListItem 
                                store={store}
                                onSelect={onSelect}
                                selected={store.id === selectedId}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {filteredStores.length === 0 && (
                <span className="block p-4 text-center text-sm text-muted">
                    Inga varuhus hittades baserat på din sökning.
                </span>
            )}
        </div>
    )
}