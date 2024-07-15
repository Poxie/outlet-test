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
        <div className="p-4 flex items-center justify-between border-b-[1px] border-b-tertiary">
            <div className="flex items-center gap-2">
                <span className="text-lg">
                    {title}
                </span>

                {search && (
                    <span className="text-sm text-muted">
                        ({searchResultCount} result{searchResultCount !== 1 ? 's' : ''} based on "{search}")
                    </span>
                )}
            </div>
            {searchKeys && (
                <Input 
                    value={search}
                    onChange={setSearch}
                    placeholder={searchPlaceholder}
                    className="w-[280px] -m-1.5 px-2.5 py-2 text-sm"
                />
            )}
        </div>
    )
}