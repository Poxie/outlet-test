"use client";
import getCurrentUser from "@/api/users/getCurrentUser";
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

    return children;
}