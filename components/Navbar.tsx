'use client'; 
import { UserCircle, Wifi, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres cerrar la sesión?");
    if (isConfirmed) {
      await signOut({ callbackUrl: '/login' });
    }
  };
  console.log("Sesión completa:", session);
  return (
    <header className="w-full bg-slate-900 border-b border-emerald-500/30 text-white shadow-lg">
      {/* El max-w-7xl ahora está AQUÍ para que el Navbar esté centrado pero el fondo sea total */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg text-slate-900 font-black">PT</div>
          <h1 className="text-sm font-black tracking-wider">PLASTECNIVA</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold">{session?.user?.name || "Usuario"}</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                <Wifi size={10} />
                <span>EN LÍNEA</span>
              </div>
            </div>
            <UserCircle size={32} className="text-slate-600" />
          </div>

          <button 
            onClick={handleSignOut}
            type="button" 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}