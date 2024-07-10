import { ProductCategory } from "@/utils/types";
import CategoryInfo from "./CategoryInfo";
import CategoryMenu from "./CategoryMenu";
import { getReadableDate } from "@/utils";

export default function CategoryTableRow({ category }: {
    category: ProductCategory;
}) {
    const tdClassName = 'p-4';
    return(
        <tr>
            <td className={tdClassName}>
                <CategoryInfo category={category} />
            </td>
            <td className={tdClassName}>
                {category.productCount} products
            </td>
            <td className={tdClassName}>
                {getReadableDate(category.createdAt)}
            </td>
            <td className={tdClassName}>
                <div className="flex justify-end">
                    <CategoryMenu category={category} />
                </div>
            </td>
        </tr>
    )
}