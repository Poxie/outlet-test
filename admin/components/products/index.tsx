"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import { useQuery } from "@tanstack/react-query";
import getCategoriesWithProductCounts from "@/api/categories/getCategoriesWithProductCounts";
import GenericTable, { TableColumn } from "../generic-table";
import { ProductCategory } from "@/utils/types";
import { getReadableDate } from "@/utils";
import CategoryInfo from "./CategoryInfo";
import CategoryMenu from "./CategoryMenu";
import { useModal } from "@/contexts/modal";
import CreateCategoryModal from "@/modals/category/create-category";

export default function Products() {
    const { data: categories } = useQuery({
        queryKey: ["categories", 'with-counts'],
        queryFn: getCategoriesWithProductCounts,
    })

    const { setModal } = useModal();

    if(!categories) return null;

    const openCreateModal = () => setModal(<CreateCategoryModal />);

    const tableColumns: TableColumn<ProductCategory>[] = [
        { dataIndex: 'title', title: 'Details', render: category => <CategoryInfo category={category} />, width: '50%', minWidth: '500px' },
        { dataIndex: 'productCount', title: 'Assigned products', render: category => `${category.productCount} products` },
        { dataIndex: 'createdAt', title: 'Created at', render: category => getReadableDate(category.createdAt) },
    ]

    const renderMenu = (category: ProductCategory) => <CategoryMenu category={category} />;
    
    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Products', href: '/produkter' },
            ]}
        />
        <main>
            <div className="p-5">
                <Section className="p-0">
                    <GenericTable 
                        title="Categories"
                        data={categories}
                        columns={tableColumns}
                        searchKeys={['title']}
                        searchPlaceholder="Search by title..."
                        buttonText="Add category"
                        onButtonClick={openCreateModal}
                        renderMenu={renderMenu}
                    />
                </Section>
            </div>
        </main>
        </>
    )
}