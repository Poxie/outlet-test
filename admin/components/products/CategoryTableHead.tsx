export default function CategoryTableHead() {
    return(
        <thead className="text-left">
            <tr className="text-sm border-b-[1px] border-b-tertiary">
                <th className="w-3/5 px-5 py-4">Category</th>
                <th className="w-full px-5 py-4">Assigned products</th>
                <th className="px-5 py-4"></th>
            </tr>
        </thead>
    )
}