"use client"; // Necesitamos esto para usar usePathname
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Si estamos en la ruta raíz de (main), es decir, el Dashboard
  
  const isDashboard = pathname.replace(/\/$/, "") === "/panel";
  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {/* Solo mostramos el Sidebar si NO estamos en el dashboard */}
      {!isDashboard && <Sidebar />}

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Navbar />
        
        <main className={`flex-1 ${!isDashboard ? "p-6" : ""}`}>
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}