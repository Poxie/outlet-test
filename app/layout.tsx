import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FavoritesProvider from "@/contexts/favorites";

const montserrat = Montserrat({ subsets: ["latin"] });

const title = "Åhléns Outlet - 30-70 procents lägre pris än i övriga butiker";
const description = "Vi erbjuder mode, hem och skönhet till 30-70 procents lägre pris än i övriga butiker. I våra varuhus finns såväl etablerade varumärken som vi är vana att se på Åhléns, liksom nya och tillfälliga kollektioner.";
export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
