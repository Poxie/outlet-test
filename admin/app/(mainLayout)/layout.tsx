import getCurrentUser from "@/api/users/getCurrentUser";
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";

export default async function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser({
        headers: {
            Cookie: cookies().toString(),
        }
    })
    if(!user) return null;

    return(
        <div className="min-h-screen flex items-start">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}