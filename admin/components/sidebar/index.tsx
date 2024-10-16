"use client";
import Image from "next/image";
import SidebarGroups from "./SidebarGroups";
import { createContext, useContext, useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { twMerge } from "tailwind-merge";
import SidebarFooter from "./SidebarFooter";

const SidebarContext = createContext<null | {
    collapsed: boolean;
    toggleCollapse: () => void;
    setCollapsed: (collapsed: boolean) => void;
}>(null);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if(!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
}

export const COLLAPSE_SIDEBAR_WIDTH = 1024;
export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const onResize = () => {
            if(window.innerWidth <= COLLAPSE_SIDEBAR_WIDTH) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const toggleCollapse = () => setCollapsed(!collapsed);

    const value = {
        collapsed,
        toggleCollapse,
        setCollapsed,
    }
    return(
        <SidebarContext.Provider value={value}>
            <div className={twMerge(
                "flex flex-col z-50 h-[100dvh] top-0 bg-primary border-r-[1px] border-r-tertiary",
                !collapsed && "fixed sm:min-w-sidebar w-full md:w-sidebar md:sticky",
                collapsed && 'sticky',
            )}>
                <SidebarHeader />
                <div className="p-5 flex-1">
                    <SidebarGroups />
                </div>
                <SidebarFooter />
            </div>
        </SidebarContext.Provider>
    )
}