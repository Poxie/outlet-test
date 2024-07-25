import getCurrentUser from "@/api/users/getCurrentUser";
import Sidebar from "@/components/sidebar";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    try {
        console.log('Cookies:', cookies().toString()); // Log cookies
        const user = await getCurrentUser({ headers: { Cookie: cookies().toString() } });
        console.log('User:', user); // Log user data
        queryClient.setQueryData(['current-user'], user);
    } catch(error) {
        redirect('/login');
        return null;
    }

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen flex items-start">
                <Sidebar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    );
}