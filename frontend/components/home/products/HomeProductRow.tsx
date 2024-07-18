import { ProductListItem } from "@/utils/types";
import HomeProductHeader from "./HomeProductHeader";
import HomeProductGroup from "./HomeProductGroup";

export default function HomeProductRow({ listItem }: {
    listItem: ProductListItem;
}) {
    return(
        <div className="grid gap-4 py-16 first:pt-0">
            <HomeProductHeader 
                header={listItem.header}
            />
            {listItem.groups.map(group => (
                <HomeProductGroup 
                    group={group}
                    hasCategory={listItem.hasCategory}
                    key={group.id}
                />
            ))}
        </div>
    )
}