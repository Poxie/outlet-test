import Input from "../input";

export default function TableHeader<T>({ title, searchKeys, searchPlaceholder, setSearch, searchResultCount, search }: {
    title: string;
    searchKeys?: (keyof T)[];
    searchPlaceholder?: string;
    setSearch: (value: string) => void;
    search: string;
    searchResultCount?: number;
}) {
    return(
        <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-3 border-b-[1px] border-b-tertiary">
            <div className="flex items-center gap-2">
                <span className="">
                    {title}
                </span>

                {search && (
                    <span className="text-sm text-muted">
                        ({searchResultCount} result{searchResultCount !== 1 ? 's' : ''} based on {`"${search}"`})
                    </span>
                )}
            </div>
            {searchKeys && (
                <Input 
                    value={search}
                    onChange={setSearch}
                    placeholder={searchPlaceholder}
                    className="sm:w-[280px] -m-1.5 px-2.5 py-2 text-sm"
                    containerClassName="w-full sm:w-auto"
                />
            )}
        </div>
    )
}