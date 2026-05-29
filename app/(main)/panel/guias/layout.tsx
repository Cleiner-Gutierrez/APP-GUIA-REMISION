// app/(main)/guias/layout.tsx
export default function GuiasLayout({ children }: { children: React.ReactNode }) {
  // Eliminamos Sidebar. 
  // No necesitamos estructura aquí porque el MainLayout ya pone el Sidebar y el Navbar.
  return <>{children}</>;
}