import ArrowIcon from "@/assets/icons/ArrowIcon";
import { TableColumn } from ".";

export default function TableHead<T>({ columns, buttonText, onButtonClick }: {
    columns: TableColumn<T>[];
    buttonText?: string;
    onButtonClick?: () => void;
}) {
    return(
        <thead>
            <tr className="text-left border-b-[1px] border-b-tertiary">
                {columns.map((column, index) => (
                    // Render column headers based on the columns prop
                    <th 
                        style={{ 
                            width: column.width || 'auto',
                            minWidth: column.minWidth || 'auto',
                        }}
                        className="px-4 py-3 text-sm text-nowrap"
                        key={index}
                    >
                        {column.title}
                    </th>
                ))}
                {buttonText && onButtonClick && (
                    <th className="flex justify-end text-nowrap">
                        <button 
                            className="p-3 flex items-center gap-1 text-sm font-medium hover:bg-secondary active:bg-tertiary transition-colors"
                            onClick={onButtonClick}
                            aria-label={buttonText}
                        >
                            {buttonText}
                            
                            <ArrowIcon size={18} />
                        </button>
                    </th>
                )}
            </tr>
        </thead>
    )
}