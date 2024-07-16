"use client";
import useGetAllProductGroups from "@/hooks/product-groups/useGetAllProductGroups";
import GenericTable, { TableColumn } from "../generic-table";
import { ProductGroup } from "@/utils/types";
import Section from "../section";
import ProductGroupDetails from "./ProductGroupDetails";
import ProductGroupMenu from "./ProductGroupMenu";
import { getReadableDate } from "@/utils";

export default function ProductGroups() {
    const { data: groups } = useGetAllProductGroups();

    if(!groups) return null;
    
    const tableColumns: TableColumn<ProductGroup>[] = [
        { title: 'Details', dataIndex: 'name', render: group => <ProductGroupDetails productGroup={group} />, width: '50%', minWidth: '500px' },
        { title: 'Assigned products', dataIndex: 'productCount', render: group => `${group.productCount} products` },
        { title: 'Added at', dataIndex: 'createdAt', render: group => getReadableDate(group.createdAt) },
    ]

    const renderMenu = (group: ProductGroup) => <ProductGroupMenu productGroup={group} />;

    return(
        <GenericTable 
            title="Product groups"
            columns={tableColumns}
            data={groups}
            searchPlaceholder="Search by group name..."
            searchKeys={['name']}
            renderMenu={renderMenu}
        />
    )
}