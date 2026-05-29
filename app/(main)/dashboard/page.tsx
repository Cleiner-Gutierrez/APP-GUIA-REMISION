'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FileText, Users, ShieldCheck, Truck } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const cards = [
    {
      title: "Guías de Remisión",
      desc: "Nueva guía, consultar y reportes",
      icon: <FileText size={32} className="text-emerald-600" />,
      path: "/panel/guias/inicio",
      gradient: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Clientes",
      desc: "Nuevo cliente, consultar y reportes",
      icon: <Users size={32} className="text-blue-600" />,
      path: "/panel/clientes/inicio",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      title: "Administrador",
      desc: "Usuarios y parametrización",
      icon: <ShieldCheck size={32} className="text-purple-600" />,
      path: "/panel/administrador/inicio",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      title: "Logística",
      desc: "Transportistas, choferes y vehículos",
      icon: <Truck size={32} className="text-amber-600" />,
      path: "/panel/logistica/inicio",
      gradient: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <div className="h-[calc(100vh-140px)] bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 flex items-center">
      <div className="flex flex-col gap-10 p-8 max-w-7xl w-full mx-auto">
        {/* Saludo */}
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Bienvenido, <span className="text-emerald-300">{session?.user?.name || "Usuario"}</span>
          </h1>
          <p className="text-emerald-100/70 text-lg">Panel de control centralizado | Plastecniva S.A.S.</p>
        </div>

        {/* Grid de tarjetas limpias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <Link 
              key={card.title}
              href={card.path}
              className="relative overflow-hidden bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 group"
            >
              {/* Fondo gradiente al hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative flex items-center gap-6">
                {/* Icono */}
                <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                
                {/* Texto */}
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">{card.desc}</p>
                </div>

                {/* Indicador de flecha */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}