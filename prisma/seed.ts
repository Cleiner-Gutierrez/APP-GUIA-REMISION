import 'dotenv/config'; 
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Rol } from '@prisma/client';
import bcrypt from 'bcryptjs'; 

const neon = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('♻️ Poblando usuarios desde variables de entorno...');

  try {
    // Definimos los usuarios leyendo del .env con valores por defecto si no existen
    const usuariosParaSembrar = [
      { 
        nombre: 'Administrador Sistema', 
        username: process.env.USER_ADMIN_EMAIL || 'administrador@plastecniva.com', 
        passwordPlain: process.env.USER_ADMIN_PASSWORD || 'admin2026', 
        rol: Rol.ADMIN 
      },
      { 
        nombre: 'Jesús Gutiérrez', 
        username: process.env.USER_VENTAS_EMAIL || 'jgutierrez@plastecniva.com', 
        passwordPlain: process.env.USER_VENTAS_PASSWORD || 'jesus2026', 
        rol: Rol.VENTAS 
      },
      { 
        nombre: 'Miguel Gómez', 
        username: process.env.USER_BODEGA_EMAIL || 'mgomez@plastecniva.com', 
        passwordPlain: process.env.USER_BODEGA_PASSWORD || 'bodega2026', 
        rol: Rol.BODEGA 
      },
      { 
        nombre: 'Arturo Vallejo', 
        username: process.env.USER_GERENCIA_EMAIL || 'avallejo@plastecniva.com', 
        passwordPlain: process.env.USER_GERENCIA_PASSWORD || 'gerencia2026', 
        rol: Rol.GERENCIA 
      }
    ];

    let adminUser = null;

    for (const u of usuariosParaSembrar) {
      const passwordLimpia = u.passwordPlain.trim();
      const passwordEncriptada = await bcrypt.hash(passwordLimpia, 10);

      const usuarioInstancia = await prisma.user.upsert({
        where: { username: u.username },
        update: { 
          nombre: u.nombre, 
          rol: u.rol, 
          password: passwordEncriptada 
        },
        create: {
          username: u.username,
          nombre: u.nombre,
          password: passwordEncriptada,
          rol: u.rol
        },
      });
      
      console.log(`✅ Usuario Listo: ${usuarioInstancia.nombre} - (${usuarioInstancia.username})`);
      
      if (usuarioInstancia.rol === Rol.ADMIN) {
        adminUser = usuarioInstancia;
      }
    }

    // ... (El resto de tu lógica de parámetros sigue igual)
    console.log('\n🚀 ¡Todo cargado correctamente!');
  } catch (error) {
    console.error('❌ Error durante el sembrado:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();