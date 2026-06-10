'use client';

import { useSession } from 'next-auth/react';
import { createCliente } from '@/app/actions/guiaActions';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react'; // 1. Importamos useRef

export default function NuevoClientePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // 2. Creamos la referencia

  const handleAction = async (formData: FormData) => {
    const userId = (session?.user as any)?.id;
    
    if (!userId) {
      alert("❌ Error: Sesión no encontrada.");
      return;
    }

    formData.append("id_usuario", userId);

    setIsSubmitting(true);
    try {
      const result = await createCliente(formData);

      if (result.success) {
        alert("✅ Cliente guardado con éxito");
        // 3. Limpiamos el formulario usando la referencia
        formRef.current?.reset(); 
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (error) {
      alert("❌ Ocurrió un error inesperado al guardar el cliente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Nuevo Cliente</h1>
          <p className="text-emerald-50 text-sm">Ingresa los datos para registrar un nuevo cliente.</p>
        </div>

        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          <div className="p-6 overflow-y-auto">
            {/* 4. Asignamos la referencia al form */}
            <form ref={formRef} action={handleAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre / Razón Social</label>
                <input name="razonSocial" required type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ej. Plastecniva S.A." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">RUC / DNI</label>
                <input name="identificacion" required type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ej. 12345678901" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Correo Electrónico</label>
                <input name="correo" type="email" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="contacto@cliente.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Teléfono</label>
                <input name="telefono" type="tel" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ej. 0999999999" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Dirección Fiscal</label>
                <textarea name="direccion" required className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none h-24" placeholder="Dirección completa..."></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => router.back()} 
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Guardando..." : "Guardar Cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}