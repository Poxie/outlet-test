"use client";
import useGetStores from "@/hooks/stores/useGetStores";
import StoresTableHead from "./StoresTableHead";
import StoresTableRow from "./StoresTableRow";

export default function StoresTable() {
    const { data: stores } = useGetStores();

    if(!stores) return null;

    return(
        <div className="grid">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <StoresTableHead />
                    <tbody className="divide-y-[1px] divide-secondary">
                        {stores.map(store => (
                            <StoresTableRow 
                                store={store}
                                key={store.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}