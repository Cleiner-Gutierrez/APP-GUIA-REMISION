export default function Footer() {
  return (
    <footer className="w-full py-6 bg-slate-900 border-t border-emerald-500/30 text-slate-400 text-[11px]">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Plastecniva Guias de Remisión - Otro prodcuto de MARVISOFT, Ingeniería de Software</p>
      </div>
    </footer>
  );
}