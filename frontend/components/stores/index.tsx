import AllStoresMap from "./AllStoresMap";
import AllStoresChips from "./AllStoresChips";
import StoreList from "./StoreList";

export default async function Stores() {
    return(
        <main className="main-width p-section">
            <h1 className="mb-8 text-4xl text-center">
                Våra varuhus
            </h1>
            <AllStoresMap />
            <AllStoresChips className="mt-3" />
            <StoreList className="mt-8 pt-8 border-t-[1px] border-t-tertiary" />
        </main>
    )
}