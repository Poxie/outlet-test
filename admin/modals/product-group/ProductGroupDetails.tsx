import { ProductGroup } from "@/utils/types";

export default function ProductGroupDetails({ productGroup }: {
    productGroup: ProductGroup;
}) {
    return(
        <div>
            {productGroup.name}
        </div>
    )
}