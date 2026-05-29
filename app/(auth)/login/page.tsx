'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react'; // Importación necesaria

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojito

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password,
      });

      if (result?.error) {
        setError('Usuario o contraseña incorrectos. Verifique sus datos.');
        setLoading(false);
      } else {
        window.location.href = '/panel'; 
        router.refresh();
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError('Ocurrió un error inesperado al conectar con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-600 via-emerald-500 to-amber-400">
      <header className="w-full bg-slate-900 border-b-2 border-emerald-500/50 px-8 py-5 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center font-bold text-slate-900">P</div>
          <h1 className="text-white font-black tracking-[0.2em] text-sm uppercase">Plastecniva S.A.S.</h1>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase border border-emerald-500/30 px-3 py-1 rounded-full">
          Sistema de Control de Despacho
        </span>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-slate-950/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden min-h-[500px]">
          <div className="hidden md:flex flex-col h-full bg-slate-900/80 backdrop-blur-md p-10 text-white border-r border-white/5">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wider uppercase">Módulo Interno</span>
              <h1 className="text-3xl font-black tracking-tight leading-tight">
                Control de Despacho <br />
                <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">& Logística</span>
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Bienvenido al sistema automatizado de generación de guías de remisión manuales de Plastecniva. Optimice los procesos de carga y garantice el rastreo en cada entrega.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 bg-white h-full flex flex-col justify-center">
            <div className="space-y-1 mb-6">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Iniciar Sesión</h3>
              <p className="text-xs text-slate-500">Ingrese sus credenciales corporativas</p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="jgutierrez@plastecniva.com"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Contraseña</label>
                  <div className="relative"> {/* Contenedor para el icono */}
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-emerald-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 transition-colors cursor-pointer"
              >
                {loading ? 'Verificando cuenta...' : 'Ingresar al Sistema'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full bg-slate-900 py-6 border-t border-emerald-500/30 text-center text-[14px] text-slate-400 font-medium tracking-wide">
        <p>📍 Planta Central — Guayaquil, Ecuador | © {new Date().getFullYear()} Otro producto de Marvisoft, Ingeniería de Software </p>
      </footer>
    </div>
  );
}