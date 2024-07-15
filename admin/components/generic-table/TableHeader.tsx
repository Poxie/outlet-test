import Input from "../input";

export default function TableHeader<T>({ title, searchKeys, searchPlaceholder, setSearch, search }: {
    title: string;
    searchKeys?: (keyof T)[];
    searchPlaceholder?: string;
    setSearch: (value: string) => void;
    search: string;
}) {
    return(
        <div className="p-4 flex items-center justify-between border-b-[1px] border-b-tertiary">
            <span className="text-lg">
                {title}
            </span>
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