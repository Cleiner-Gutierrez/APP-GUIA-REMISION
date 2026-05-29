'use client';
import { useState } from 'react';

export default function GestionTransportePage() {
  const [tab, setTab] = useState('empresa'); 

  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Encabezado */}
        <div className="pb-4">
          <h1 className="text-3xl font-black text-white">Gestión de Transporte</h1>
          <p className="text-emerald-50 text-sm">Registro centralizado de Empresas, Choferes y Camiones.</p>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex gap-1 bg-white/20 p-1 rounded-xl w-fit backdrop-blur-sm">
          {[
            { id: 'empresa', label: 'Empresa' },
            { id: 'chofer', label: 'Chofer' },
            { id: 'camion', label: 'Camión' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                tab === t.id ? 'bg-white text-emerald-700 shadow-lg' : 'text-emerald-50 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENEDOR DE FORMULARIOS */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            {tab === 'empresa' && <FormEmpresa />}
            {tab === 'chofer' && <FormChofer />}
            {tab === 'camion' && <FormCamion />}
            
            <div className="mt-8 flex justify-end">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg">
                Guardar Registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes de formulario consistentes
function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={placeholder} />
    </div>
  );
}

function FormEmpresa() { 
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input label="RUC Empresa" placeholder="1234567890001" />
    <Input label="Razón Social" placeholder="Nombre de la empresa" />
  </div> 
}

function FormChofer() { 
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input label="Cédula" placeholder="1234567890" />
    <Input label="Nombre Completo" placeholder="Nombres y Apellidos" />
  </div> 
}

function FormCamion() { 
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input label="Placa" placeholder="ABC-1234" />
    <Input label="Marca / Modelo" placeholder="Hino / GH" />
  </div> 
}