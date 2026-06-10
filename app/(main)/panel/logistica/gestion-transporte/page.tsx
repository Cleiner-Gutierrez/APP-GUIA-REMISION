'use client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { createTransportista, createChofer, createVehiculo } from '@/app/actions/guiaActions';

export default function GestionTransportePage() {
  const [tab, setTab] = useState('empresa'); 
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userId = (session?.user as any)?.id;
    if (!userId) {
      alert("❌ Error: Sesión no encontrada.");
      return;
    }

    // Obtenemos los datos del formulario activo
    const formData = new FormData(e.currentTarget);
    formData.append("id_usuario", userId);

    setIsSubmitting(true);
    let result;

    try {
      if (tab === 'empresa') result = await createTransportista(formData);
      if (tab === 'chofer') result = await createChofer(formData);
      if (tab === 'camion') result = await createVehiculo(formData);

      if (result?.success) {
        alert("✅ Registro guardado correctamente");
        formRef.current?.reset();
      } else {
        alert("❌ Error: " + result?.message);
      }
    } catch (error) {
      alert("❌ Ocurrió un error inesperado.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              type="button"
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
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            
            {tab === 'empresa' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="ruc" label="RUC Empresa" placeholder="1234567890001" required />
                <Input name="razonSocial" label="Razón Social" placeholder="Nombre de la empresa" required />
                <Input name="telefono" label="Teléfono Empresa (Opcional)" placeholder="0999999999" />
              </div>
            )}

            {tab === 'chofer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="cedula" label="Cédula" placeholder="1234567890" required />
                <Input name="nombre" label="Nombre Completo" placeholder="Nombres y Apellidos" required />
                <Input name="telefono" label="Teléfono Chofer (Opcional)" placeholder="0999999999" />
                <Input name="licencia" label="Licencia (Opcional)" placeholder="Licencia..." />
              </div>
            )}

            {tab === 'camion' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="placa" label="Placa" placeholder="ABC-1234" required />
                <Input name="marca" label="Marca (Opcional)" placeholder="Hino" />
                <Input name="modelo" label="Modelo (Opcional)" placeholder="GH" />
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar Registro"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componentes de formulario consistentes agregando prop name
function Input({ label, placeholder, name, required = false }: { label: string, placeholder: string, name: string, required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <input 
        name={name} 
        required={required}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
        placeholder={placeholder} 
      />
    </div>
  );
}