import Input from "../input";

export default function UsersTableHead({ setSearch }: {
    setSearch: (text: string) => void;
}) {
    const thClassName = 'px-4 py-3';
    return (
        <thead>
            <tr className="text-sm text-left border-b-[1px] border-b-tertiary">
                <th className={thClassName}>Name</th>
                <th className={thClassName}>Email</th>
                <th className={thClassName}>Role</th>
                <th className={thClassName}>Added at</th>
                <th className={thClassName}>
                    <div className="flex justify-end">
                        <Input 
                            onChange={setSearch}
                            placeholder="Search name or email"
                            containerClassName="w-[260px] -m-2"
                            className="px-2.5 py-2 font-medium" 
                        />
                    </div>
                </th>
            </tr>
        </thead>
    );
};