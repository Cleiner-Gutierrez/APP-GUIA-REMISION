import { FileText, Download, Filter } from "lucide-react";

export default function ReportesLogisticaPage() {
  // Datos simulados de reportes
  const reportes = [
    { id: "REP-001", nombre: "Eficiencia de Flota", fecha: "2026-05-28", estado: "Generado" },
    { id: "REP-002", nombre: "Consumo de Combustible", fecha: "2026-05-27", estado: "Pendiente" },
    { id: "REP-003", nombre: "Reporte de Mantenimiento", fecha: "2026-05-26", estado: "Generado" },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white">Reportes Logísticos</h1>
            <p className="text-emerald-50 text-sm">Análisis y descargas de actividad operativa.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg">
            <Filter size={16} /> Filtrar Fechas
          </button>
        </div>

        {/* Tabla de Reportes */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-400">
              <tr>
                <th className="px-6 py-4">ID Reporte</th>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportes.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{rep.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{rep.nombre}</td>
                  <td className="px-6 py-4">{rep.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      rep.estado === 'Generado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rep.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                      <FileText size={16} />
                    </button>
                    <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}