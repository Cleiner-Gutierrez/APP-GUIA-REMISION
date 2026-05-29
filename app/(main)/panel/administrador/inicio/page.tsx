import { Shield, Users, Settings, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminInicioPage() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Administración</h1>
          <p className="text-emerald-50 text-sm">Control centralizado del sistema y configuraciones.</p>
        </div>

        {/* Acceso rápido a módulos */}
        <div className="flex-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link href="/panel/administrador/usuarios" className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-transform">
            <Users className="text-emerald-600 mb-4" size={32} />
            <h3 className="font-black text-slate-900">Usuarios</h3>
            <p className="text-slate-500 text-xs mt-1">Gestiona accesos y roles del sistema.</p>
          </Link>

          <Link href="/panel/administrador/parametros" className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-transform">
            <Settings className="text-emerald-600 mb-4" size={32} />
            <h3 className="font-black text-slate-900">Parámetros</h3>
            <p className="text-slate-500 text-xs mt-1">Configura valores globales y reglas.</p>
          </Link>

          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-emerald-600" size={24} />
              <h3 className="font-black text-slate-900">Estado del Sistema</h3>
            </div>
            <div className="mt-4">
               <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Operativo</span>
            </div>
          </div>
        </div>

        {/* Log de Actividad o Panel de Seguridad */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm flex items-center gap-2">
            <Shield size={16} className="text-emerald-600" /> Auditoría Reciente
          </div>
          <div className="flex-grow overflow-y-auto p-4 text-slate-500 text-sm italic">
            Cargando logs de seguridad...
          </div>
        </div>
      </div>
    </div>
  );
}