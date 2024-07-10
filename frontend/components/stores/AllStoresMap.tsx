import { getAllStoresIframeSrc } from "@/utils/storeUtils"

export default function AllStoresMap() {
    const allStoresMap = getAllStoresIframeSrc();
    
    return(
        <iframe 
            src={allStoresMap} 
            className="min-h-[280px] w-full aspect-[3/1.1] rounded-md bg-secondary" 
        />
    )
}