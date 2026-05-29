'use server'

import { prisma } from '@/lib/prisma';

/**
 * Obtiene todos los catálogos y la configuración necesaria para la creación de guías.
 * Calcula automáticamente el siguiente número secuencial de guía.
 */
export async function getCatalogos() {
  const [
    clientes, 
    vehiculos, 
    choferes, 
    empresas, 
    gramajes, 
    colores, 
    cuellos, 
    productos, // <--- 1. Agregado aquí
    emisor,
    ultimaGuia
  ] = await Promise.all([
    prisma.cliente.findMany({ orderBy: { razonSocial: 'asc' } }),
    prisma.vehiculo.findMany({ orderBy: { placa: 'asc' } }),
    prisma.chofer.findMany({ orderBy: { nombre: 'asc' } }),
    prisma.empresaTransporte.findMany({ orderBy: { razonSocial: 'asc' } }),
    prisma.gramaje.findMany({ orderBy: { nombre: 'asc' } }),
    prisma.color.findMany({ orderBy: { nombre: 'asc' } }),
    prisma.cuello.findMany({ orderBy: { nombre: 'asc' } }),
    prisma.producto.findMany({ orderBy: { nombre: 'asc' } }), // <--- 2. Consulta a la tabla producto
    prisma.plastecniva.findFirst(),
    prisma.guiaRemision.findFirst({
      orderBy: { secuencial: 'desc' },
      select: { secuencial: true }
    })
  ]);
  
  const siguienteSecuencial = ultimaGuia && ultimaGuia.secuencial
    ? (parseInt(ultimaGuia.secuencial) + 1).toString().padStart(9, '0') 
    : "000000001";
  
  return { 
    clientes, 
    vehiculos, 
    choferes, 
    empresas, 
    gramajes, 
    colores, 
    cuellos, 
    productos, // <--- 3. Retornado en el objeto
    emisor,
    siguienteSecuencial
  };
}

// --- Funciones específicas para consultas individuales ---

export async function getProductos() {
  return await prisma.producto.findMany({
    orderBy: { nombre: 'asc' }
  });
}

// ... tus otras funciones existentes (getClientes, getVehiculos, etc.)
export async function getClientes() {
  return await prisma.cliente.findMany({
    select: { id_cliente: true, razonSocial: true, identificacion: true, direccion: true, direccionDescarga: true, telefono: true },
    orderBy: { razonSocial: 'asc' }
  });
}

export async function getVehiculos() {
  return await prisma.vehiculo.findMany({
    select: { id_vehiculo: true, placa: true, marca: true, modelo: true },
    orderBy: { placa: 'asc' }
  });
}

export async function getChoferes() {
  return await prisma.chofer.findMany({
    select: { id_chofer: true, nombre: true, cedula: true },
    orderBy: { nombre: 'asc' }
  });
}

export async function getEmpresasTransporte() {
  return await prisma.empresaTransporte.findMany({
    select: { id_empresa: true, razonSocial: true, ruc: true },
    orderBy: { razonSocial: 'asc' }
  });
}

export async function getGramajes() {
  return await prisma.gramaje.findMany({ orderBy: { nombre: 'asc' } });
}

export async function getColores() {
  return await prisma.color.findMany({ orderBy: { nombre: 'asc' } });
}

export async function getCuellos() {
  return await prisma.cuello.findMany({ orderBy: { nombre: 'asc' } });
}