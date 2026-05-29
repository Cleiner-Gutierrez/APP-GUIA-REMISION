'use client'; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  const isMainPanel = pathname.replace(/\/$/, "") === '/panel';

  const getMenuItems = () => {
    if (pathname.includes('/guias')) return [
      { name: "Inicio", path: "/panel/guias/inicio" },
      { name: "Nueva Guía", path: "/panel/guias/nueva-guia" },       
      { name: "Consultar", path: "/panel/guias/consulta" },
      { name: "Reportes", path: "/panel/guias/reportes" }
    ];
    if (pathname.includes('/clientes')) return [
      { name: "Inicio", path: "/panel/clientes/inicio" },
      { name: "Nuevo Cliente", path: "/panel/clientes/nuevo" },
      { name: "Consultar", path: "/panel/clientes/consulta" },
      { name: "Reportes", path: "/panel/clientes/reportes" }
    ];
    if (pathname.includes('/administrador')) return [
      { name: "Inicio", path: "/panel/administrador/inicio" },
      { name: "Nuevo Usuario", path: "/panel/administrador/nuevo" },
      { name: "Consulta", path: "/panel/administrador/usuarios" },
      { name: "Reportes", path: "/panel/administrador/reportes" },
      { name: "Parametros", path: "/panel/administrador/parametros" }
    ];
    if (pathname.includes('/logistica')) return [
      { name: "Inicio", path: "/panel/logistica/inicio" },
      { name: "Gestión Transporte", path: "/panel/logistica/gestion-transporte" },
      { name: "Reportes", path: "/panel/logistica/reportes" }
    ];
    return [];
  };

  const currentModuleItems = getMenuItems();

  return (
    <aside className="w-64 bg-slate-900 h-screen p-6 border-r border-emerald-500/20 hidden md:flex flex-col gap-8 shrink-0">
      
      <Link href="/panel" className="flex items-center gap-3 text-emerald-400 font-bold hover:text-white transition-colors">
        <LayoutDashboard size={20} />
        Panel Central
      </Link>

      {!isMainPanel && currentModuleItems.length > 0 && (
        <nav className="flex flex-col gap-2 flex-grow">
          <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2 px-3">Opciones de Sección</p>
          {currentModuleItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-sm ${
                  isActive ? "bg-emerald-600 text-white" : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* BOTÓN AL FINAL */}
          <div className="mt-auto pt-4 border-t border-slate-800">
            <Link 
              href="/panel" 
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-bold"
            >
             <ArrowLeft size={16} />
             Salir al Panel
            </Link>
          </div>
        </nav>
      )}
    </aside>
  );
}