import { RenderTableComponent, TableColumn } from ".";
import TableCell from "./TableCell";

export default function TableRow<T>({ item, columns, renderMenu }: {
    item: T;
    columns: TableColumn<T>[];
    renderMenu?: RenderTableComponent<T>;
}) {
    return(
        <tr>
            {columns.map((column, colIndex) => (
                <TableCell 
                    item={item}
                    column={column}
                    key={colIndex}
                />
            ))}
            {renderMenu && (
                <td className="p-4">
                    <div className="flex justify-end">
                        {renderMenu(item)}
                    </div>
                </td>
            )}
        </tr>
    )
}