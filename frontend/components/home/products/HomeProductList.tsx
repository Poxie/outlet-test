"use client";
import { useQuery } from "@tanstack/react-query"
import HomeProductRow from "./HomeProductRow"
import getHomeProductList from "@/api/products/getHomeProductList";

export default function HomeProductList() {
    const { data: productList } = useQuery({
        queryKey: ['product-list'],
        queryFn: getHomeProductList,
    })

    if(!productList) return null;

    return(
        <div className="grid divide-y-[1px] divide-tertiary">
            {productList.map((listItem, key) => (
                <HomeProductRow 
                    listItem={listItem}
                    key={key}
                />
            ))}
        </div>
    )
}