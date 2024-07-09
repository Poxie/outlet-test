import { ProductCategory } from "@/utils/types";
import CategoryInfo from "./CategoryInfo";
import CategoryMenu from "./CategoryMenu";

export default function CategoryTableRow({ category }: {
    category: ProductCategory;
}) {
    const tdClassName = 'p-5';
    return(
        <tr>
            <td className={tdClassName}>
                <CategoryInfo category={category} />
            </td>
            <td className={tdClassName}>
                {category.productCount} products
            </td>
            <td className={tdClassName}>
                <div className="flex justify-end">
                    <CategoryMenu category={category} />
                </div>
            </td>
        </tr>
    )
}