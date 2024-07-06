"use client";
import getCurrentUser from "@/api/users/getCurrentUser";
import Sidebar from "@/components/sidebar";
import { useQuery } from "@tanstack/react-query";

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const { data, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
    })

    if(isLoading) return null;

    if(!data) {
        window.location.href = '/login';
        return null;
    }

    return(
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}