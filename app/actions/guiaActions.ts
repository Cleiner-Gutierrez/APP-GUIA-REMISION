'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSiguienteSecuencial() {

  const ultimaGuia = await prisma.guiaRemision.findFirst({
    orderBy: { id_guia: 'desc' },
    select: { secuencial: true }
  });

  if (!ultimaGuia) return "000000001";

  const numero = parseInt(ultimaGuia.secuencial) + 1;

  return numero.toString().padStart(9, '0');
}

export async function createGuia(formData: FormData) {

  try {

    const getInt = (key: string) =>
      parseInt(formData.get(key) as string || "0");

    // --- DIAGNÓSTICO: Inspección de FormData ---
    console.log("--- Diagnóstico Form Data ---");
    // Corrección para evitar error de iteración en Vercel
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`${key}:`, value);
    }

    const id_cliente = getInt("id_cliente");
    const id_usuario = getInt("id_usuario");
    const id_emisor = getInt("id_emisor");

    if (!id_cliente || !id_usuario) {
      throw new Error(
        "Datos de cabecera faltantes (Cliente/Usuario)"
      );
    }

    // --- VALIDACIÓN EMISOR ---
    const emisorExistente =
      await prisma.plastecniva.findUnique({
        where: { id_emisor }
      });

    if (!emisorExistente) {
      throw new Error(
        `El emisor con ID ${id_emisor} no existe en la base de datos.`
      );
    }

    const resultado = await prisma.$transaction(
      async (tx) => {

        const secuencial =
          formData.get("secuencial") as string;

        const existe =
          await tx.guiaRemision.findUnique({
            where: { secuencial }
          });

        if (existe) {
          throw new Error("El secuencial ya existe.");
        }

        const nuevaGuia =
          await tx.guiaRemision.create({
            data: {

              secuencial,

              fechaEmision: new Date(
                formData.get("fechaEmision") as string
              ),

              fechaInicioTrans: new Date(
                formData.get("fechaInicioTrans") as string
              ),

              fechaFinTrans:
                formData.get("fechaFinTrans")
                  ? new Date(
                      formData.get("fechaFinTrans") as string
                    )
                  : null,

              comprobanteVenta:
                formData.get("comprobanteVenta") as string || null,

              claveAcceso:
                formData.get("claveAcceso") as string || null,

              numeroAutorizacion:
                formData.get("numeroAutorizacion") as string || null,

              fechaAutorizacion:
                formData.get("fechaAutorizacion")
                  ? new Date(
                      formData.get("fechaAutorizacion") as string
                    )
                  : null,

              puntoPartida:
                formData.get("puntoPartida") as string,

              puntoLlegada:
                formData.get("puntoLlegada") as string,

              id_cliente,

              id_vehiculo:
                getInt("id_vehiculo"),

              id_chofer:
                getInt("id_chofer"),

              id_empresa_trans:
                getInt("id_empresa"),

              id_usuario_creador:
                id_usuario,

              id_emisor,
            }
          });

        const rawItems =
          formData.get("items") as string;

        // Validación adicional para asegurar que parseo sea seguro
        if (!rawItems) throw new Error("No hay items en la guía");

        const items = JSON.parse(rawItems);

        console.log("Items parseados:", items);

        if (!Array.isArray(items)) {
          throw new Error(
            "Los items no son un array válido"
          );
        }

        await tx.detalleGuiaItem.createMany({
          data: items.map(
            (item: any, index: number) => {

              if (
                !item ||
                typeof item.cantidad === 'undefined'
              ) {

                console.error(
                  `Error en item[${index}]:`,
                  item
                );

                throw new Error(
                  `El item en la posición ${index} no tiene cantidad definida.`
                );
              }

              return {

                id_guia: nuevaGuia.id_guia,

                id_producto:
                  parseInt(item.id_producto),

                id_gramaje:
                  parseInt(item.id_gramaje),

                id_color:
                  parseInt(item.id_color),

                id_cuello:
                  parseInt(item.id_cuello),

                cantidad:
                  parseInt(item.cantidad.toString()),

                descripcion:
                  "Producto registrado en guía",

                id_usuario_creador:
                  id_usuario,

                codigoInterno: null
              };
            }
          )
        });

        return nuevaGuia;
      }
    );

    revalidatePath('/panel/guias');

    return {
      success: true,
      id: resultado.id_guia
    };

  } catch (error: any) {

    console.error(
      "DEBUG - Error al generar la guía:",
      error.message
    );

    return {
      success: false,
      message: error.message
    };
  }
}

// =======================================================
// OBTENER GUÍA POR ID
// =======================================================

export async function getGuiaById(id: number) {

  try {

    const guia =
      await prisma.guiaRemision.findUnique({

        where: {
          id_guia: id,
        },

        include: {

          emisor: true,

          cliente: true,

          empresa_trans: true,

          chofer: true,

          vehiculo: true,

          usuario_creador: true,

          items: {
            include: {

              producto: true,

              color: true,

              gramaje: true,

              cuello: true,

            },
          },
        },
      });

    return guia;

  } catch (error) {

    console.error(
      "Error obteniendo guía:",
      error
    );

    return null;
  }
}