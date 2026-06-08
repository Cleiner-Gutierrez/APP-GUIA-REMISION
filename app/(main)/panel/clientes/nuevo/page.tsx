export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default function NuevoClientePage() {
  return (
    // CAMBIO: Fondo degradado unificado
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado fijo */}
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Nuevo Cliente</h1>
          <p className="text-emerald-50 text-sm">Ingresa los datos básicos para registrar un nuevo cliente en el sistema.</p>
        </div>

        {/* Contenedor del formulario: Fondo blanco translúcido */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          <div className="p-6 overflow-y-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre / Razón Social</label>
                <input type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Ej. Plastecniva S.A." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">RUC / DNI</label>
                <input type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Ej. 12345678901" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Correo Electrónico</label>
                <input type="email" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="contacto@cliente.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Teléfono</label>
                <input type="tel" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Ej. 0999999999" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Dirección Fiscal</label>
                <textarea className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-24" placeholder="Dirección completa..."></textarea>
              </div>

              {/* Botones de acción */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}