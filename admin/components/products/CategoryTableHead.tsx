export default function CategoryTableHead() {
    return(
        <thead className="text-left text-nowrap">
            <tr className="text-sm border-b-[1px] border-b-tertiary">
                <th className="min-w-[500px] w-3/5 px-5 py-4">Category</th>
                <th className="px-5 py-4">Assigned products</th>
                <th className="px-5 py-4">Created at</th>
                <th className="px-5 py-4"></th>
            </tr>
        </thead>
    )
}