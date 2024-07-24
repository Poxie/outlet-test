import getProductPage from "@/api/product-page/getProductPage";
import Products from "@/components/product-page";

export default async function ProductCategory({ params: { parentId } }: {
    params: { parentId: string };
}) {
    const { header, groups } = await getProductPage(parentId);

    return(
        <Products 
            header={header}
            groups={groups}
        />
    )
}