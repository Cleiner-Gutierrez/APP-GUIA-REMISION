import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full"><body className="bg-slate-900 h-full flex flex-col"><Providers><main className="flex-grow flex flex-col">{children}</main></Providers></body></html>
  );
}