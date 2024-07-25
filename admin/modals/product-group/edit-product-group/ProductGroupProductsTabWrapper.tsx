import useQueryProductsByParentId from "@/hooks/products/useQueryProductsByParentId";
import { ProductGroup } from "@/utils/types";
import ProductGroupProductsTab from "./ProductGroupProductsTab";

export default function ProductGroupProductsTabWrapper(props: { productGroup: ProductGroup }) {
    const { data: products, isPending: loadingProducts } = useQueryProductsByParentId(props.productGroup.id);

    return(
        <ProductGroupProductsTab 
            {...props}
            products={products || []}
            loading={loadingProducts} 
        />
    );
}