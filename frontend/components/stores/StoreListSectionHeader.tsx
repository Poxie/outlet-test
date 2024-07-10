export default function StoreListSectionHeader({ children }: {
    children: React.ReactNode;
}) {
    return(
        <span className="mb-1 text-sm font-semibold">
            {children}
        </span>
    )
}