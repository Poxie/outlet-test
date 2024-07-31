"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import GenericTable, { TableColumn } from "../generic-table";
import { ProductGroup } from "@/utils/types";
import { useModal } from "@/contexts/modal";
import TextSkeleton from "../skeletons/TextSkeleton";
import BlogMenu from "./BlogMenu";
import useQueryBlogPosts from "@/hooks/blog/useQueryBlogPosts";
import { getReadableDate } from "@/utils";
import ProductGroupDetails from "../products/ProductGroupDetails";
import BannerWithInfoSkeleton from "../skeletons/BannerWithInfoSkeleton";
import CreateProductGroup from "@/modals/product-group/create-product-group";

export default function Blog() {
    const { data: blogGroups, isPending } = useQueryBlogPosts();

    const { setModal } = useModal();

    const openCreateModal = () => setModal(<CreateProductGroup groupType="BLOG" title="Add blog post" />);
    
    const tableColumns: TableColumn<ProductGroup>[] = [
        { dataIndex: 'name', title: 'Details', width: '50%', minWidth: '500px', renderSkeleton: <BannerWithInfoSkeleton />, render: data => <ProductGroupDetails productGroup={data} /> },
        { dataIndex: 'productCount', title: 'Assigned products', render: data => `${data.productCount} products` },
        { dataIndex: 'createdAt', title: 'Added at', render: data => getReadableDate(data.createdAt) },
    ]
    
    const renderMenu = (productGroup: ProductGroup) => <BlogMenu productGroup={productGroup} />;

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Blog', href: '/' },
            ]}
        />
        <main className="p-5">
            <Section className="p-0">
                <GenericTable 
                    title="Blog posts"
                    data={blogGroups || []}
                    columns={tableColumns}
                    searchKeys={['name']}
                    searchPlaceholder="Search by name..."
                    buttonText={'Add blog post'}
                    onButtonClick={openCreateModal}
                    renderMenu={renderMenu}
                    loading={isPending}
                    defaultLoadiangSkeleton={<TextSkeleton />}
                    hasLoadingSkeleton
                />
            </Section>
        </main>
        </>
    )
}