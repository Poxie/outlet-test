import getCategory from "@/api/products/getCategory";
import getProductGroup from "@/api/products/getProductGroup";
import Products from "@/components/product-page";
import { Category, ProductGroup } from "@/utils/types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProductCategory({ params: { parentId } }: {
    params: { parentId: string };
}) {
    const queryClient = new QueryClient();

    let header: Category | undefined = undefined;
    let groups: ProductGroup[] = [];

    // ! This is a hack to get the header and groups in the same query
    // ! Far from best way, fix this later
    try {
        const group = await getProductGroup(parentId);
        groups = [group];
    } catch(error: any) {
        // Pass for now
    }
    if(!header) {
        try {
            header = await getCategory(parentId);
            groups = header.groups;
        } catch(error: any) {
            // Pass for now
        }
    }

    if(!groups.length) {
        return(
            <span>
                sidan hittades inte
            </span>
        )
    }

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Products 
                header={header}
                groups={groups}
            />
        </HydrationBoundary>
    )
}