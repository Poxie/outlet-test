"use client";
import useGetAllCategories from "@/hooks/categories/useGetAllCategories";
import GenericTable, { TableColumn } from "../generic-table";
import { Category } from "@/utils/types";
import Section from "../section";
import CategoryDetails from "./CategoryDetails";
import CategoryMenu from "./CategoryMenu";
import { getReadableDate } from "@/utils";

export default function Categories() {
    const { data: categories } = useGetAllCategories();
    
    if(!categories) return null;

    const tableColumns: TableColumn<Category>[] = [
        { dataIndex: 'title', title: 'Details', render: category => <CategoryDetails category={category} />, width: '50%', minWidth: '500px' },
        { dataIndex: 'groupCount', title: 'Assigned groups', render: category => `${category.groupCount} groups` },
        { dataIndex: 'createdAt', title: 'Added at', render: category => getReadableDate(category.createdAt) },
    ]

    const renderMenu = (category: Category) => <CategoryMenu category={category} />;

    return(
        <Section className="p-0">
            <GenericTable 
                title="Categories"
                columns={tableColumns}
                data={categories}
                searchPlaceholder="Search by category name..."
                searchKeys={['title']}
                renderMenu={renderMenu}
            />
        </Section>
    )
}