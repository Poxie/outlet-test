import { TableColumn } from ".";

export default function TableCell<T>({ column, item }: {
    item: T;
    column: TableColumn<T>;
}) {
    return(
        <td 
            style={{ 
                width: column.width || 'auto',
                minWidth: column.minWidth || 'auto',
            }}
            className="p-4 max-w-[200px]"
        >
            {/* Render cell using custom render function if provided, else default to item's value */}
            {column.render ? column.render(item) : item[column.dataIndex]?.toString()}
        </td>
    )
}