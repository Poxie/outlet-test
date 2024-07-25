"use client";
import useGetAllProductGroups from "@/hooks/product-groups/useGetAllProductGroups";
import GenericTable, { TableColumn } from "../generic-table";
import { ProductGroup } from "@/utils/types";
import Section from "../section";
import ProductGroupDetails from "./ProductGroupDetails";
import ProductGroupMenu from "./ProductGroupMenu";
import { getReadableDate } from "@/utils";
import { useModal } from "@/contexts/modal";
import CreateProductGroup from "@/modals/product-group/create-product-group";
import TextSkeleton from "../skeletons/TextSkeleton";
import BannerWithInfoSkeleton from "../skeletons/BannerWithInfoSkeleton";

export default function ProductGroups() {
    const { data: groups, isPending } = useGetAllProductGroups();

    const { setModal } = useModal();

    const openCreateMenu = () => setModal(<CreateProductGroup />);
    
    const tableColumns: TableColumn<ProductGroup>[] = [
        { title: 'Details', dataIndex: 'name', render: group => <ProductGroupDetails productGroup={group} />, width: '50%', minWidth: '500px', renderSkeleton: <BannerWithInfoSkeleton /> },
        { title: 'Assigned products', dataIndex: 'productCount', render: group => `${group.productCount} products` },
        { title: 'Added at', dataIndex: 'createdAt', render: group => getReadableDate(group.createdAt) },
    ]

    const renderMenu = (group: ProductGroup) => <ProductGroupMenu productGroup={group} />;

    return(
        <GenericTable 
            title="Product groups"
            columns={tableColumns}
            data={groups || []}
            searchPlaceholder="Search by group name..."
            searchKeys={['name']}
            renderMenu={renderMenu}
            buttonText="Add product group"
            onButtonClick={openCreateMenu}
            loading={isPending}
            defaultLoadiangSkeleton={<TextSkeleton />}
            hasLoadingSkeleton
        />
    )
}