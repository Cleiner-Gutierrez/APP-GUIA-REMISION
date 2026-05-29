export default function NuevoUsuarioPage() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400 p-4">
      <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
        
        {/* Encabezado fijo */}
        <div className="flex-none">
          <h1 className="text-3xl font-black text-white">Nuevo Usuario</h1>
          <p className="text-emerald-50 text-sm">Registra a un nuevo miembro del personal y asigna sus permisos.</p>
        </div>

        {/* Contenedor del formulario */}
        <div className="flex-grow min-h-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
          <div className="p-6 overflow-y-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre Completo</label>
                <input type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Ej. Juan Pérez" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Correo Electrónico</label>
                <input type="email" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="usuario@empresa.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Rol / Permisos</label>
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option>Seleccionar Rol...</option>
                  <option>Administrador</option>
                  <option>Operador Logístico</option>
                  <option>Visualizador</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Contraseña Inicial</label>
                <input type="password" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="********" />
              </div>

              {/* Botones de acción */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}