import getStores from "@/api/stores/getStores";
import StoresContainer from "./StoresContainer";

export default async function Stores() {
    const stores = await getStores();

    return(
        <main className="main-width p-section">
            <h1 className="mb-8 text-4xl text-center">
                Våra varuhus
            </h1>
            <StoresContainer stores={stores} />
        </main>
    )
}