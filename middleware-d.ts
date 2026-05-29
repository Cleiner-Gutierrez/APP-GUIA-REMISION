import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  console.log(`[DEBUG] Path: ${pathname} | Token: ${token ? 'PRESENTE' : 'AUSENTE'}`);

  // MODIFICACIÓN TEMPORAL: No redirigir, solo dejar pasar para probar
  // Si esto quita el 307, el problema es la lógica de redirección.
  return NextResponse.next(); 
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};