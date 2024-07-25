import { TableColumn } from "."

const SKELETON_ROWS = 3;
export default function TableSkeleton<T>({ columns, defaultLoadingSkeleton }: {
    columns: TableColumn<T>[];
    defaultLoadingSkeleton?: React.ReactNode;
}) {
    const skeletonColumns = Array.from(Array(SKELETON_ROWS)).map(() => '');

    return(
        <tbody className="divide-y-[1px] divide-secondary">
            {skeletonColumns.map((_,index) => (
                <tr>
                    {columns.map((column, colIndex) => (
                        <td className="p-4">
                            {column.renderSkeleton || defaultLoadingSkeleton}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}