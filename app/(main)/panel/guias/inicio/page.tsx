import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuiasInicioPage() {
  return (
    // 'h-full' obliga a este div a ocupar toda la celda central del grid del layout
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4 flex flex-col">
      
      {/* Contenedor con 'h-full' para propagar la altura a los hijos */}
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado - 'flex-none' evita que se encoja */}
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Guías de Remisión</h1>
          <p className="text-emerald-50 text-sm">Gestiona y monitorea tus guías de transporte.</p>
        </div>

        {/* Tarjetas de Métricas - 'flex-none' evita que se encojan */}
        <div className="flex-none grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/20">
            <p className="text-slate-500 text-[9px] font-bold uppercase">Total Guías</p>
            <h3 className="text-xl font-black text-slate-900">124</h3>
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/20">
            <p className="text-slate-500 text-[9px] font-bold uppercase">Pendientes</p>
            <h3 className="text-xl font-black text-amber-600">12</h3>
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/20">
            <p className="text-slate-500 text-[9px] font-bold uppercase">Completadas</p>
            <h3 className="text-xl font-black text-emerald-600">112</h3>
          </div>
        </div>

        {/* Tabla - 'flex-grow' y 'min-h-0' son la clave para que ocupe el resto del espacio sin desbordarse */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          <div className="flex-none p-3 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 text-sm">Guías Recientes</h2>
            <Link href="/panel/guias/reportes" className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:underline">
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          {/* El scroll interno queda confinado solo a este div */}
          <div className="flex-grow overflow-y-auto p-4 text-slate-500 italic text-sm">
            Lista de guías cargándose...
          </div>
        </div>
      </div>
    </div>
  );
}