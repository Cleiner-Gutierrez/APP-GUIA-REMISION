import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // 1. Si NO hay token y la ruta es protegida (ej: empieza por /panel), redirige al login
  if (!token && pathname.startsWith('/panel')) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Si hay token y quiere entrar al login, redirígelo al panel
  if (token && pathname === '/api/auth/signin') {
    const dashboardUrl = new URL('/panel', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next(); 
}

export const config = {
  // Asegúrate de que aquí solo incluya las rutas que quieres proteger
  matcher: ["/panel/:path*", "/api/auth/signin"],
}