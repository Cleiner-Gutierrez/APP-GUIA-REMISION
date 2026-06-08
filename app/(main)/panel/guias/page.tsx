// app/(main)/guias/page.tsx
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GuiasPage() {
  // Corregido: Ahora apunta a la ruta raíz correcta sin /dashboard
  redirect('/guias/inicio');
}