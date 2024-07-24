import HomeProductRow from "./HomeProductRow"
import getProductList from "@/api/product-list/getProductList";

export default async function HomeProductList() {
    const productList = await getProductList();

    return(
        <div className="grid divide-y-[1px] divide-tertiary border-b-[1px] border-b-tertiary">
            {productList.map((listItem, key) => (
                <HomeProductRow 
                    listItem={listItem}
                    key={key}
                />
            ))}
        </div>
    )
}