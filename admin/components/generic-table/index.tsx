import React, { memo, useMemo, ReactNode, useState } from 'react';
import TableHeader from './TableHeader';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableSkeleton from './TableSkeleton';

export type RenderTableComponent<T> = (record: T) => ReactNode;

export type TableColumn<T> = {
    title: string; // The title to display for the column
    dataIndex: keyof T; // The key from the data item corresponding to this column
    render?: RenderTableComponent<T>; // Optional custom render function for the column cell
    width?: string; // Optional width for the column
    minWidth?: string; // Optional min width for the column
    renderSkeleton?: ReactNode; // Skeleton to display while loading
}

export type GenericTableProps<T> = {
    title: string;
    data: T[]; // Array of data items to be displayed in the table
    columns: TableColumn<T>[]; // Array of column configurations
    searchKeys?: (keyof T)[]; // Optional keys to search on
    searchPlaceholder?: string; // Optional search placeholder
    buttonText?: string; // Optional button text
    onButtonClick?: () => void; // Optional button click handler
    renderMenu?: RenderTableComponent<T>; // Optional custom render function for the menu
    loading?: boolean; // Optional loading state
    loadingPlaceholder?: ReactNode; // Optional loading placeholder
    defaultLoadiangSkeleton?: ReactNode; // Optional default loading skeleton
    hasLoadingSkeleton?: boolean; // Optional loading skeleton
}

export default function GenericTable<T>({ title, data, columns, searchPlaceholder='Search', searchKeys, buttonText, onButtonClick, renderMenu, loading, hasLoadingSkeleton, defaultLoadiangSkeleton, loadingPlaceholder='Loading...' }: GenericTableProps<T>) {
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        if(!searchKeys) return data;

        return data.filter(item =>
            searchKeys.some(key =>
                item[key]?.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search, searchKeys]);

    const hasActiveFilters = !!search;
    return (
        <div className="grid max-w-full">
            <TableHeader 
                title={title}
                searchKeys={searchKeys}
                searchPlaceholder={searchPlaceholder}
                search={search}
                setSearch={setSearch}
                searchResultCount={filteredData.length}
            />
            <div className="overflow-x-auto">
                <table className="w-full">
                    <TableHead 
                        columns={columns}
                        buttonText={buttonText}
                        onButtonClick={onButtonClick}
                    />
                    {loading && hasLoadingSkeleton && (
                        <TableSkeleton 
                            columns={columns}
                            defaultLoadingSkeleton={defaultLoadiangSkeleton}
                        />
                    )}
                    {!loading && (
                        <TableBody 
                            data={filteredData}
                            columns={columns}
                            renderMenu={renderMenu}
                        />
                    )}
                </table>
                {loading && !hasLoadingSkeleton && (
                    <span className="block py-5 text-center">
                        {loadingPlaceholder}
                    </span>
                )}
                {!loading && filteredData.length === 0 && (
                    <div className="p-10 text-center border-t-[1px] border-t-tertiary">
                        <span>
                            {hasActiveFilters ? (
                                'No results found'
                            ) : (
                                'No data to show'
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}