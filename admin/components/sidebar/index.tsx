"use client";
import Image from "next/image";
import SidebarGroups from "./SidebarGroups";
import HamIcon from "@/assets/icons/HamIcon";
import { createContext, useContext, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { twMerge } from "tailwind-merge";

const SidebarContext = createContext<null | {
    collapsed: boolean;
    toggleCollapse: () => void;
}>(null);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if(!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
}

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);

    const value = {
        collapsed,
        toggleCollapse,
    }
    return(
        <SidebarContext.Provider value={value}>
            <div className={twMerge(
                "bg-primary border-r-[1px] border-r-tertiary",
                !collapsed && 'w-sidebar',
            )}>
                <SidebarHeader />
                <div className="p-5">
                    <SidebarGroups />
                </div>
            </div>
        </SidebarContext.Provider>
    )
}