"use client";
import Link from "next/link";
import { SidebarItem } from "./SidebarGroups"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSidebar } from ".";

export default function SidebarGroupItem({ item: { text, path, icon } }: {
    item: SidebarItem;
}) {
    const { collapsed } = useSidebar();

    const pathname = usePathname();
    const isActive = pathname.startsWith(path);
    return(
        <Link
            href={path}
            className={twMerge(
                "p-2.5 -mx-2.5 flex items-center gap-3 text-muted hover:text-primary hover:bg-secondary active:bg-tertiary transition-colors rounded-md",
                isActive && "text-primary bg-secondary font-medium",
            )}
        >
            {icon}
            {!collapsed && text}
        </Link>
    )
}