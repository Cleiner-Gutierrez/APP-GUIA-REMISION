import { Truck, Users, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LogisticaInicioPage() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-black text-white">Logística</h1>
          <p className="text-emerald-50">Panel de control de flotas y transporte.</p>
        </div>

        {/* Tarjetas de Resumen (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Camiones" value="12" icon={<Truck className="text-emerald-600" />} />
          <StatCard title="Choferes Activos" value="8" icon={<Users className="text-emerald-600" />} />
          <StatCard title="En Tránsito" value="4" icon={<Package className="text-emerald-600" />} />
        </div>

        {/* Acceso Rápido */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-xl">
          <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest text-sm">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/panel/logistica/gestion-transporte" 
              className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:shadow-lg transition-all group"
            >
              <span className="font-bold text-slate-900">Gestionar Transporte</span>
              <ArrowRight className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/panel/logistica/reportes" 
              className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:shadow-lg transition-all group"
            >
              <span className="font-bold text-slate-900">Ver Reportes</span>
              <ArrowRight className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-white/20 p-6 rounded-2xl shadow-lg flex items-center gap-4">
      <div className="p-4 bg-emerald-100 rounded-xl">{icon}</div>
      <div>
        <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">{title}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}