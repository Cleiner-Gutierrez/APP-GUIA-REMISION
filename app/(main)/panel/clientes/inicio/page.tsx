import { ArrowRight, UserPlus, Users, Search } from "lucide-react";
import Link from "next/link";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default function ClientesInicioPage() {
  return (
    // CAMBIO: Fondo degradado unificado y estructura de contenedor
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Clientes</h1>
          <p className="text-emerald-50 text-sm">Gestiona tu base de datos de clientes y contactos.</p>
        </div>

        {/* Tarjetas de Métricas - Estilo con fondo semitransparente para combinar con el degradado */}
        <div className="flex-none grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Total Clientes</p>
              <h3 className="text-2xl font-black text-slate-900">45</h3>
            </div>
            <Users className="text-emerald-600" size={24} />
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Nuevos (Mes)</p>
              <h3 className="text-2xl font-black text-amber-600">08</h3>
            </div>
            <UserPlus className="text-amber-600" size={24} />
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Activos</p>
              <h3 className="text-2xl font-black text-emerald-600">42</h3>
            </div>
            <Search className="text-emerald-600" size={24} />
          </div>
        </div>

        {/* Área de Listado - Fondo blanco translúcido */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden flex flex-col">
          <div className="flex-none p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 text-sm">Clientes Recientes</h2>
            <Link href="/panel/clientes/consulta" className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 text-slate-500 italic text-sm">
            Cargando lista de clientes...
          </div>
        </div>
      </div>
    </div>
  );
}