// app/(main)/guias/page.tsx
import { redirect } from 'next/navigation';

export default function GuiasPage() {
  // Corregido: Ahora apunta a la ruta raíz correcta sin /dashboard
  redirect('/guias/inicio');
}