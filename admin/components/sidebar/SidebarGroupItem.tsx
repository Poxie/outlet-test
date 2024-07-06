import Link from "next/link";
import { SidebarItem } from "./SidebarGroups"

export default function SidebarGroupItem({ item: { text, path, icon } }: {
    item: SidebarItem;
}) {
    return(
        <Link
            href={path}
            className="p-2.5 -mx-2.5 flex items-center gap-3 text-muted hover:text-primary hover:bg-secondary active:bg-tertiary transition-colors rounded-md"
        >
            {icon}
            {text}
        </Link>
    )
}