'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, useFieldArray } from 'react-hook-form';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import {
  Truck,
  User,
  Trash2,
  FileText,
  CarFront,
  Building2,
  Package,
  MapPin,
} from 'lucide-react';
import { createGuia, getSiguienteSecuencial} from '@/app/actions/guiaActions';

import { generarClaveAcceso } from '@/lib/sri';
import { getCatalogos } from '@/app/actions/catalogs';

/* =========================================================
   INTERFACES
========================================================= */
interface IDetalleGuia {
  producto: string;
  gramaje: string;
  color: string;
  cuello: string;
  unidades: number;
}

interface IGuiaForm {
  establecimiento: string; puntoEmision: string; secuencial: string; ambiente: string; tipoEmision: string; claveAcceso: string;
  numeroAutorizacion: string; fechaAutorizacion: string; fechaEmision: string; fechaFinTrans: string; motivoTraslado: string; puntoPartida: string;
  puntoLlegada: string; comprobanteVenta: string; id_cliente: string; identificacionCliente: string; razonSocialCliente: string;
  direccionCliente: string; telefonoCliente: string; id_empresa_transporte: string; rucTransportista: string; telefonoTransportista: string;
  id_chofer: string; licenciaChofer: string; id_vehiculo: string; marca: string; modelo: string;
  items: IDetalleGuia[];
}
/* =========================================================
   ESTILOS
========================================================= */
const inputClass =
  'w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-[11px] font-medium outline-none transition-all focus:border-slate-700 focus:ring-2 focus:ring-slate-300';
const labelClass =
  'block text-[9px] font-black uppercase tracking-[1px] text-slate-500 mb-1';
const cardClass =
  'bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden';

export default function NuevaGuiaForm() {
  const { data: session } = useSession();
  const [mensajeExito, setMensajeExito] = useState(false);
  const [catalogo, setCatalogo] = useState<any>({
    clientes: [], vehiculos: [], choferes: [], empresas: [], productos: [], gramajes: [], colores: [], cuellos: [],
  });

  const [infoEmpresa, setInfoEmpresa] = useState({
    razonSocial: 'Cargando...',
    ruc: '0000000000000',
    secuencial: '000000000',
  });

  const now = new Date()
    .toLocaleString('sv-SE', {
      timeZone: 'America/Guayaquil',
    })
    .replace(' ', 'T')
    .slice(0, 16);

  const { register, control, handleSubmit, watch, setValue, reset } =
    useForm<IGuiaForm>({
      defaultValues: {
        fechaEmision: now,
        fechaAutorizacion: now,

        items: [
          {
            producto: '',
            gramaje: '',
            color: '',
            cuello: '',
            unidades: 1,
          },
        ],

        puntoPartida: 'Fábrica Plastecniva, Planta Guayaquil',
        motivoTraslado: 'Venta de Mercaderia',
        comprobanteVenta: 'Factura',
      },
    });

  
  /* =========================================================
   CARGA DE CATÁLOGOS Y SECUENCIAL
========================================================= */
useEffect(() => {
    // Definimos 'now' como string con formato ISO para incluir fecha y hora
    const now = new Date().toISOString(); 

    const cargarDatos = async () => {
      try {
        // 1. Obtener catálogos y el secuencial en paralelo para ser más rápidos
        const [data, nextSecuencial] = await Promise.all([
          getCatalogos(),
          getSiguienteSecuencial()
        ]);

        if (data) {
          setCatalogo(data);

          if (data.emisor) {
            setInfoEmpresa({
              razonSocial: data.emisor.razonSocial,
              ruc: data.emisor.ruc,
              secuencial: data.emisor.establecimiento,
            });

            setValue('establecimiento', data.emisor.establecimiento || '001');
            setValue('puntoEmision', data.emisor.puntoEmision || '001');
            
            // 2. Asignamos el secuencial calculado por el servidor
            setValue('secuencial', nextSecuencial); 
            // 3. Asignamos la fecha y hora actual en formato compatible
            setValue('fechaEmision', now);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };
    
    cargarDatos();
  }, [setValue]);

  const [establecimiento, puntoEmision, secuencial, ambiente] = watch(['establecimiento', 'puntoEmision', 'secuencial', 'ambiente']);
  /* =========================================================
     GENERAR CLAVE ACCESO
  ========================================================= */
  useEffect(() => {
    if (establecimiento && puntoEmision && secuencial && ambiente) {
      const serie = `${establecimiento}${puntoEmision}`;
      const clave = generarClaveAcceso(
        new Date(),
        '06',
        infoEmpresa.ruc,
        ambiente,
        serie,
        secuencial.padStart(9, '0'),
        '1'
      );

      setValue('claveAcceso', clave);
      setValue('numeroAutorizacion', clave);
    }
  }, [establecimiento, puntoEmision, secuencial, ambiente, setValue, infoEmpresa.ruc]);

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const [loading, setLoading] = useState(false);
/* =========================================================
        SUBMIT - ADAPTADO (PDF dinámico)
========================================================= */
const onSubmit = async (data: IGuiaForm) => {
  const userId = (session?.user as any)?.id;
  const userName = (session?.user as any)?.name || "Usuario";

  if (!userId) {
    alert("❌ Error: Sesión no detectada.");
    return;
  }

  // IMPORTANTE:
  // Abrimos la ventana antes del proceso async
  // para evitar bloqueo del navegador
  const nuevaVentana = window.open("", "_blank");

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("secuencial", data.secuencial);

    formData.append(
      "fechaEmision",
      new Date(data.fechaEmision).toISOString()
    );

    formData.append(
      "fechaInicioTrans",
      new Date(data.fechaEmision).toISOString()
    );

    if (data.fechaFinTrans) {
      formData.append(
        "fechaFinTrans",
        new Date(data.fechaFinTrans).toISOString()
      );
    }

    if (data.comprobanteVenta) {
      formData.append(
        "comprobanteVenta",
        data.comprobanteVenta
      );
    }

    if (data.claveAcceso) {
      formData.append(
        "claveAcceso",
        data.claveAcceso
      );
    }

    if (data.numeroAutorizacion) {
      formData.append(
        "numeroAutorizacion",
        data.numeroAutorizacion
      );
    }

    if (data.fechaAutorizacion) {
      formData.append(
        "fechaAutorizacion",
        new Date(data.fechaAutorizacion).toISOString()
      );
    }

    formData.append("puntoPartida", data.puntoPartida);
    formData.append("puntoLlegada", data.puntoLlegada);

    formData.append("id_cliente", data.id_cliente);
    formData.append("id_vehiculo", data.id_vehiculo);
    formData.append("id_chofer", data.id_chofer);

    formData.append(
      "id_empresa",
      data.id_empresa_transporte
    );

    formData.append("id_usuario", userId);

    formData.append("id_emisor", "1");

    formData.append(
      "items",
      JSON.stringify(
        data.items.map((item) => ({
          id_producto: parseInt(item.producto),
          id_gramaje: parseInt(item.gramaje),
          id_color: parseInt(item.color),
          id_cuello: parseInt(item.cuello),
          cantidad: parseInt(item.unidades.toString()),
        }))
      )
    );

    const result = await createGuia(formData);

    if (!result.success) {
      throw new Error(
        result.message || "Error al generar guía"
      );
    }

    // =====================================================
    // YA NO USAMOS sessionStorage
    // El PDF leerá desde DB usando result.id
    // =====================================================

    // LIMPIAR FORMULARIO
    reset();

    const nuevoSecuencial =
      await getSiguienteSecuencial();

    setValue("secuencial", nuevoSecuencial);

    setMensajeExito(true);

    // ABRIR PDF DINÁMICO
    setTimeout(() => {

      if (nuevaVentana) {
        nuevaVentana.location.href =
          `/guia-remision/imprimir/${result.id}`;
      }

      setMensajeExito(false);

    }, 3500);

  } catch (error: any) {

    nuevaVentana?.close();

    console.error(error);

    alert(
      "❌ " +
      (error.message ||
        "Error desconocido al guardar")
    );

  } finally {

    setLoading(false);

  }
};
/* =========================================================
   RETURN
========================================================= */
return (
  <div className="min-h-screen bg-slate-100 p-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[1800px] mx-auto space-y-4" >

        {/* =========================================================
            CABECERA SRI
        ========================================================= */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-5 shadow-2xl border border-slate-700">
          <div className="flex flex-col gap-4">
            {/* SUPERIOR */}
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
              <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white">
                    GUÍA DE REMISIÓN ELECTRÓNICA
                  </h1>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Documento electrónico autorizado por el SRI
                  </p>
                </div>
                <div className="hidden md:flex gap-4 border-l border-white/20 pl-5">
                  <div><label className="block text-[8px] font-black uppercase text-slate-300 mb-1">Razón Social</label>
                    <input value={infoEmpresa.razonSocial} readOnly
                      className="w-72 h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white font-semibold"/>
                  </div>

                  <div><label className="block text-[8px] font-black uppercase text-slate-300 mb-1">RUC</label>
                    <input value={infoEmpresa.ruc} readOnly
                      className="w-40 h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white font-mono"/>
                  </div>
                </div>
              </div>

              <div className="hidden xl:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2">
                <FileText size={16} className="text-white" />
                <span className="text-[11px] font-bold text-white">SRI ECUADOR</span>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 gap-3">
              <div><label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Establecimiento</label>
                <input
                  {...register('establecimiento')}
                  className="w-full h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white"
                  placeholder="001"/>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Punto Emisión</label>
                <input
                  {...register('puntoEmision')}
                  className="w-full h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white"
                  placeholder="001"/>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Secuencial</label>
                <input
                  {...register('secuencial')}  readOnly
                  className="w-full h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-[11px] font-mono text-slate-300"
                  placeholder="000000001" />
              </div>

              <div>
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Fecha Emisión</label>
                <input
                  type="text" readOnly {...register('fechaEmision')}
                  className="w-full h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-[11px] text-slate-200"/>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Ambiente</label>
                <select
                  {...register('ambiente')} className="w-full h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white">
                  <option value="1" className="text-black"> Pruebas </option>
                  <option value="2" className="text-black">Producción </option>
                </select>
              </div>
              <div>
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">Tipo Emisión</label>
                <select
                  {...register('tipoEmision')} className="w-full h-10 rounded-xl bg-white/10 border border-white/10 px-3 text-[11px] text-white"
                ><option value="1" className="text-black"> Normal</option>
                </select>
              </div>

              <div className="xl:col-span-3">
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black"> Clave Acceso</label>
                <input {...register('claveAcceso')} readOnly  className="w-full h-10 rounded-xl bg-white/20 border border-white/10 px-3 text-[11px] font-mono text-white"/>
              </div>

              <div className="xl:col-span-3"> <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black">
                  N° Autorización </label>
                <input  {...register('numeroAutorizacion')} readOnly
                  className="w-full h-10 rounded-xl bg-white/20 border border-white/10 px-3 text-[11px] font-mono text-white"
                />
              </div>
              <div className="xl:col-span-2">
                <label className="block text-[8px] uppercase text-slate-300 mb-1 font-black"> Fecha Autorización</label>
                <input type="text"  readOnly  {...register('fechaAutorizacion')}
                  className="w-full h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-[11px] text-slate-300"/>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            GRID PRINCIPAL
        ========================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* DESTINATARIO */}
          <section className={`${cardClass} bg-emerald-50`}>
            <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-400 px-4 py-3">
              <User size={15} />
              <h2 className="font-black text-sm text-slate-800"> Destinatario</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div> <label className={labelClass}>Cliente</label>
                <select
                  {...register('id_cliente', {
                    onChange: (e) => {
                      const c = catalogo?.clientes?.find(
                        (x: any) =>
                          x.id_cliente == e.target.value
                      );

                      if (c) {
                        setValue('identificacionCliente', c.identificacion);
                        setValue('razonSocialCliente', c.razonSocial);
                        setValue('direccionCliente', c.direccion);
                        setValue('telefonoCliente', c.telefono);
                        setValue('puntoLlegada', c.direccionDescarga || c.direccion);
                      }
                    },
                  })}
                  className={inputClass}>
                  <option value=""> -- Seleccione un cliente -- </option>
                  {catalogo?.clientes?.map((c: any) => (
                    <option key={c.id_cliente}  value={c.id_cliente}>
                      {c.razonSocial}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Identificación</label>
                <input
                  {...register('identificacionCliente')}className={`${inputClass} bg-slate-100`}readOnly />
              </div>

              <div><label className={labelClass}>Teléfono</label><input
                  {...register('telefonoCliente')} className={`${inputClass} bg-slate-100`}readOnly/>
              </div>

              <div>
                <label className={labelClass}>Dirección</label><input
                  {...register('direccionCliente')} className={`${inputClass} bg-slate-100`} readOnly />
              </div>
            </div>
          </section>

         {/* TRANSPORTE */}
<section className={`${cardClass} bg-emerald-50`}>
  <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-400 px-4 py-3">
    <Truck size={15} />
    <h2 className="font-black text-sm text-slate-800">Transporte</h2>
  </div>
  
  {/* Ajustado a grid-cols-3 */}
  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
    <div className="md:col-span-3">
      <label className={labelClass}>Empresa Transporte </label>
      <select
        {...register('id_empresa_transporte', {
          onChange: (e) => {
            const emp = catalogo?.empresas?.find((x: any) => x.id_empresa == e.target.value);
            if (emp) {
              setValue('rucTransportista', emp.ruc);
              setValue('telefonoTransportista', emp.telefono);
            }
          },
        })}
        className={inputClass}>
        <option value=""> -- Seleccione empresa -- </option>
        {catalogo?.empresas?.map((e: any) => (
          <option key={e.id_empresa} value={e.id_empresa}>{e.razonSocial}</option>
        ))}
      </select>
    </div>

    <div>
      <label className={labelClass}>RUC</label>
      <input {...register('rucTransportista')} maxLength={15} className={`${inputClass} bg-slate-100`} readOnly/>
    </div>

    <div>
      <label className={labelClass}>Teléfono</label>
      <input {...register('telefonoTransportista')} maxLength={15} className={`${inputClass} bg-slate-100`} readOnly/>
    </div>

    {/* Input de Fecha con validación */}
    <div>
      <label className={labelClass}>Fecha Fin Transporte</label>
      <input
        type="date"
        {...register('fechaFinTrans', { 
            required: "La fecha de fin es obligatoria",
            validate: (value) => {
                const fechaInicio = watch('fechaEmision'); // O la fecha que uses como inicio
                return value >= fechaInicio || "La fecha fin debe ser mayor a la inicial";
            }
        })}
        className={inputClass}
      />
    </div>
  </div>
</section>
          {/* CHOFER */}
          <section className={`${cardClass} bg-emerald-50`}>
            <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-400 px-4 py-3">
              <Building2 size={15} />

              <h2 className="font-black text-sm text-slate-800">Chofer </h2>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div> <label className={labelClass}>Chofer</label> <select
                  {...register('id_chofer', {
                    onChange: (e) => {
                      const ch =
                        catalogo?.choferes?.find(
                          (x: any) =>
                            x.id_chofer ==
                            e.target.value
                        );

                      if (ch) {
                        setValue(
                          'licenciaChofer',
                          ch.cedula
                        );
                      }
                    },
                  })}
                  className={inputClass}
                >
                  <option value="">-- Seleccione chofer -- </option>
                  {catalogo?.choferes?.map((ch: any) => (
                    <option
                      key={ch.id_chofer}
                      value={ch.id_chofer}
                    >
                      {ch.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Cédula</label>
                <input
                  {...register('licenciaChofer')} className={inputClass} />
              </div>
            </div>
          </section>

          {/* VEHÍCULO */}
          <section className={`${cardClass} bg-emerald-50`}>
            <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-400 px-4 py-3">
              <CarFront size={15} />
              <h2 className="font-black text-sm text-slate-800">Vehículo</h2>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div><label className={labelClass}>Placa</label>
                <select
                  {...register('id_vehiculo', {
                    onChange: (e) => {
                      const v =
                        catalogo?.vehiculos?.find(
                          (x: any) =>
                            x.id_vehiculo ==
                            e.target.value
                        );

                      if (v) {
                        setValue('marca', v.marca);
                        setValue('modelo', v.modelo);
                      }
                    },
                  })}
                  className={inputClass}>
                  <option value="">-- Placa --</option>
                  {catalogo?.vehiculos?.map((v: any) => (
                    <option
                      key={v.id_vehiculo}
                      value={v.id_vehiculo}>
                      {v.placa}
                    </option>
                  ))}
                </select>
              </div>

              <div> <label className={labelClass}>Marca y color</label>
                <input
                  {...register('marca')}className={`${inputClass} bg-slate-100`} readOnly/>
              </div>
              <div> <label className={labelClass}>Modelo</label>
                <input
                  {...register('modelo')} className={`${inputClass} bg-slate-100`} readOnly/>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================
            INFORMACIÓN TRASLADO
        ========================================================= */}
        <section
          className={`${cardClass} bg-emerald-50 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3`}>
          <div>
            <label className={labelClass}>Punto de Partida</label>
            <div className="relative">
              <MapPin
                size={14}
                className="absolute left-3 top-3 text-slate-400"/>

              <input {...register('puntoPartida')}className={`${inputClass} pl-9`}/>
            </div>
          </div>

          <div>
            <label className={labelClass}>Punto de Llegada </label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-3 text-slate-400"/>
              <input {...register('puntoLlegada')}className={`${inputClass} pl-9`}/>
            </div>
          </div>
          <div> <label className={labelClass}>Motivo de Traslado</label>
            <input
              {...register('motivoTraslado')}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}> Comprobante Venta</label>
            <input
              {...register('comprobanteVenta')}
              className={inputClass}
            />
          </div>
        </section>

        {/* =========================================================
            DETALLE MERCADERÍA
        ========================================================= */}
        <section className={`${cardClass} bg-white`}>
          <div className="flex items-center justify-between border-b bg-slate-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <Package size={15} className="text-white" />

              <h2 className="font-black text-sm text-white">Detalle Mercadería</h2>
            </div>
            <button
              type="button"
              onClick={() =>
                append({
                  producto: '', gramaje: '', color: '', cuello: '', unidades: 1,
                })
              }
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all text-white text-[10px] font-black px-4 py-2 shadow"           >
              + AGREGAR
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-emerald-400 text-slate-900">
                <tr>
                  {[
                    '#',
                    'PRODUCTO', 'GRAMAJE', 'COLOR', 'CUELLO', 'UNID.', 'ACC.',
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-3 text-left font-black uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {fields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="border-t hover:bg-slate-50">
                    <td className="p-2 text-center font-black text-slate-500">
                      {index + 1}
                    </td>

                    <td className="p-2 min-w-[200px]">
                      <select
                        {...register(`items.${index}.producto`)} className={inputClass}>
                        <option value="">- Elija producto - </option>
                        {catalogo?.productos?.map(
                          (p: any) => (
                            <option
                              key={p.id_producto}
                              value={p.id_producto}>
                              {p.nombre}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="p-2 min-w-[140px]">
                      <select {...register(`items.${index}.gramaje`)}
                        className={inputClass}>
                        <option value="">- Elija gramaje -</option>
                        {catalogo?.gramajes?.map(
                          (g: any) => (
                            <option
                              key={g.id_gramaje}
                              value={g.id_gramaje}>
                              {g.nombre}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="p-2 min-w-[140px]">
                      <select {...register(`items.${index}.color`)}
                        className={inputClass}>
                        <option value="">- Elija color - </option>

                        {catalogo?.colores?.map(
                          (c: any) => (
                            <option
                              key={c.id_color}
                              value={c.id_color}>
                              {c.nombre}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="p-2 min-w-[140px]">
                      <select {...register(`items.${index}.cuello`)} className={inputClass}>
                        <option value="">- Elija cuello -</option>
                        {catalogo?.cuellos?.map(
                          (cu: any) => (
                            <option
                              key={cu.id_cuello}
                              value={cu.id_cuello}>
                              {cu.nombre}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="p-2 w-28">
                      <input type="number"{...register(`items.${index}.unidades`)}
                        className={`${inputClass} text-center`} placeholder="0"/>
                    </td>

                    <td className="p-2 text-center w-16">
                      <button
                        type="button"  onClick={() => remove(index)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all mx-auto"                   >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

       {/* BOTÓN */}
        <div className="flex justify-end">
          <button
            type="submit"
            // La magia está en esta línea:
            // Deshabilita si está cargando o si la sesión aún no ha cargado
            disabled={loading || !session}
            className={`h-12 px-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 
              transition-all text-white text-sm font-black shadow-xl 
              ${(loading || !session) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          >
            {loading ? 'PROCESANDO...' : !session ? 'ESPERANDO SESIÓN...' : 'GENERAR GUÍA'}
          </button>
        </div>
      </form>
    </div>
  );
}