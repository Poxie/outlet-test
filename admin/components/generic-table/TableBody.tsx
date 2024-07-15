import { RenderTableComponent, TableColumn } from ".";
import TableRow from "./TableRow";

export default function TableBody<T>({ data, columns, renderMenu }: {
    data: T[];
    columns: TableColumn<T>[];
    renderMenu?: RenderTableComponent<T>;
}) {
    return(
        <tbody className="divide-y-[1px] divide-secondary">
            {data.map((item, rowIndex) => (
                <TableRow 
                    item={item}
                    columns={columns}
                    renderMenu={renderMenu}
                    key={rowIndex}
                />
            ))}
        </tbody>
    )
}