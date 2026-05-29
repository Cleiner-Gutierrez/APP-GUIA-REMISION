import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const neon = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.error("🔍 LOGIN DEBUG: Faltan credenciales");
          return null;
        }

        try {
          // 1. Buscamos el usuario
          const user = await prisma.user.findUnique({
            where: { username: credentials.username }
          });

          // 2. Diagnóstico de existencia
          if (!user) {
            console.error("🔍 LOGIN DEBUG: Usuario no encontrado en BD para:", credentials.username);
            return null;
          }

          // 3. Autopsia de la comparación
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!isMatch) {
            console.error("🔍 LOGIN DEBUG: El password NO coincide para:", credentials.username);
            return null;
          }

          console.log("✅ LOGIN DEBUG: Match exitoso para:", user.username);
          
          return {
            id: user.id_user.toString(),
            name: user.nombre,
            email: user.username,
            role: user.rol
          };
        } catch (error) {
          console.error("❌ LOGIN DEBUG: Error crítico en authorize:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si existe usuario (login inicial), guardamos datos
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // AQUÍ ESTÁ EL TRUCO: 
        // Si el token tiene el ID, pásalo a la sesión
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
    
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };