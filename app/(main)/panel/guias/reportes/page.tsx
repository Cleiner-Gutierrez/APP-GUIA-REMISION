import { FileDown, BarChart3, Filter, Calendar, Map } from "lucide-react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ReportesGuiasPage() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="flex-none flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white">Reportes de Guías</h1>
            <p className="text-emerald-50 text-sm">Analiza el rendimiento y descarga tus reportes.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg">
            <FileDown size={16} /> Exportar Excel
          </button>
        </div>

        {/* Área de reportes */}
        <div className="flex-grow min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Panel de Filtros */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Filter size={18} className="text-emerald-600" /> Configuración de Reporte
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-400">Rango de Fechas</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input type="date" className="w-full pl-9 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none" />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input type="date" className="w-full pl-9 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-400">Destino</label>
                <div className="relative">
                  <Map className="absolute left-3 top-2.5 text-slate-400" size={14} />
                  <select className="w-full pl-9 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none">
                    <option>Todos los destinos</option>
                    <option>Quito</option>
                    <option>Guayaquil</option>
                    <option>Cuenca</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Resumen Visual */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <BarChart3 size={18} className="text-emerald-600" /> Resumen Estadístico
            </div>
            
            {/* Contenedor del gráfico */}
            <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
              <p className="text-slate-400 text-sm italic font-medium">Área para gráfico de barras o circular</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}