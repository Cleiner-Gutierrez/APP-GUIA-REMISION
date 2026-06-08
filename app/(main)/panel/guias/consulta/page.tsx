import { Search, Edit2, Trash2, Eye, Plus } from "lucide-react";
import Link from "next/link";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConsultaGuiasPage() {
  // Datos de ejemplo para la tabla
  const guias = [
    { id: "G-001", fecha: "2026-05-28", destino: "Quito", estado: "Completada" },
    { id: "G-002", fecha: "2026-05-27", destino: "Guayaquil", estado: "Pendiente" },
    { id: "G-003", fecha: "2026-05-26", destino: "Cuenca", estado: "Completada" },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="flex-none flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white">Consulta de Guías</h1>
            <p className="text-emerald-50 text-sm">Visualiza y gestiona todas tus guías emitidas.</p>
          </div>
          <Link 
            href="/panel/guias/nueva-guia" 
            className="flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg"
          >
            <Plus size={16} /> Nueva Guía
          </Link>
        </div>

        {/* Tabla */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          {/* Barra de búsqueda */}
          <div className="flex-none p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por número de guía o destino..." 
                className="w-full pl-10 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Cuerpo de la tabla con scroll */}
          <div className="flex-grow overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-400 sticky top-0">
                <tr>
                  <th className="px-6 py-4">N° Guía</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Destino</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {guias.map((guia) => (
                  <tr key={guia.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{guia.id}</td>
                    <td className="px-6 py-4">{guia.fecha}</td>
                    <td className="px-6 py-4">{guia.destino}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        guia.estado === 'Completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {guia.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}