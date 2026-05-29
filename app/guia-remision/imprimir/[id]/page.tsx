"use client";

import { useEffect, useState } from "react";
import { getGuiaById } from "../../../actions/guiaActions";

interface Props {
  params: {
    id: string;
  };
}

export default function GuiaPDFPage({ params }: Props) {

  const [guia, setGuia] = useState<any>(null);

  useEffect(() => {

    const cargarGuia = async () => {

      const data = await getGuiaById(
        Number(params.id)
      );

      setGuia(data);

      setTimeout(() => {
        window.print();
      }, 800);
    };

    cargarGuia();

  }, [params.id]);

  if (!guia) {

    return (
      <div className="guia-loading">
        Cargando guía...
      </div>
    );
  }

  return (

    <div className="guia-page">

      <div
        className="
          guia-container
          w-[210mm]
          h-[275mm]
          bg-white
          mx-auto
          pt-4
          pb-2
          pl-6
          pr-2
          text-[12.5px]
          text-slate-800
        "
      >

        {/* HEADER */}
        <div className="flex justify-between gap-4 border-b border-slate-300 pb-3">

          {/* EMPRESA */}
          <div className="w-[55%]">

            <img
              src="/logo.png"
              alt="Logo"
              className="w-[220px] h-auto mb-2"
            />

            <h1 className="text-[20px] font-bold uppercase tracking-wide">
              {guia.emisor?.razonSocial}
            </h1>

            <div className="mt-2 space-y-1 leading-6">

              <p>
                <span className="font-semibold">
                  RUC:
                </span>{" "}
                {guia.emisor?.ruc}
              </p>

              <p>
                <span className="font-semibold">
                  Dirección:
                </span>{" "}
                {guia.emisor?.direccionMatriz}
              </p>

              <p>
                <span className="font-semibold">
                  Establecimiento:
                </span>{" "}
                {guia.emisor?.establecimiento}-
                {guia.emisor?.puntoEmision}
              </p>

            </div>

          </div>

          {/* DOCUMENTO */}
<div
  className="
    w-[45%]
    border
    border-slate-400
    rounded-xl
    px-3
    py-4
  "
>

  <h2
    className="
      text-center
      text-[20px]
      font-black
      mb-3
      tracking-wide
      text-slate-800
    "
  >
    GUÍA DE REMISIÓN
  </h2>

  <div className="space-y-2 leading-tight text-[13px]">

    <p>
      <span className="font-semibold">
        Número:
      </span>{" "}
      {guia.emisor?.establecimiento}-
      {guia.emisor?.puntoEmision}-
      {guia.secuencial}
    </p>

    <p>
      <span className="font-semibold">
        Fecha:
      </span>{" "}
      {new Date(
        guia.fechaEmision
      ).toLocaleDateString("es-EC")}
    </p>

    <p>
      <span className="font-semibold">
        Ambiente:
      </span>{" "}
      {guia.emisor?.ambiente}
    </p>

    <p>
      <span className="font-semibold">
        Emisión:
      </span>{" "}
      {guia.emisor?.tipoEmision}
    </p>

    {guia.numeroAutorizacion && (

      <div className="pt-1">

        <p className="font-semibold">
          Autorización y Clave de Acceso:
        </p>

        <p
          className="
            text-[11px]
            tracking-tight
            whitespace-nowrap
          "
        >
          {guia.numeroAutorizacion}
        </p>

      </div>
    )}

  </div>

</div>

</div>
 

        {/* DESTINATARIO */}
        <div className="mt-3 border border-slate-300 rounded-lg p-3">

          <h3
            className="
              text-[14px]
              font-bold
              mb-2
              uppercase
            "
          >
            Destinatario
          </h3>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 leading-6">

            <p>
              <span className="font-semibold">
                Razón Social:
              </span>{" "}
              {guia.cliente?.razonSocial}
            </p>

            <p>
              <span className="font-semibold">
                RUC / CI:
              </span>{" "}
              {guia.cliente?.identificacion}
            </p>

            <p>
              <span className="font-semibold">
                Teléfono:
              </span>{" "}
              {guia.cliente?.telefono || "-"}
            </p>

            <p>
              <span className="font-semibold">
                Dirección:
              </span>{" "}
              {guia.cliente?.direccion}
            </p>

          </div>

        </div>

        {/* TRANSPORTE */}
        <div className="mt-3 border border-slate-300 rounded-lg p-3">

          <h3
            className="
              text-[14px]
              font-bold
              mb-2
              uppercase
            "
          >
            Transporte
          </h3>

          <div className="grid grid-cols-2 gap-4 leading-6">

            <div>

              <p>
                <span className="font-semibold">
                  Empresa:
                </span>{" "}
                {guia.empresa_trans?.razonSocial}
              </p>

              <p>
                <span className="font-semibold">
                  RUC:
                </span>{" "}
                {guia.empresa_trans?.ruc}
              </p>

            </div>

            <div>

              <p>
                <span className="font-semibold">
                  Chofer:
                </span>{" "}
                {guia.chofer?.nombre}
              </p>

              <p>
                <span className="font-semibold">
                  Vehículo:
                </span>{" "}
                {guia.vehiculo?.marca}{" "}
                {guia.vehiculo?.modelo}
              </p>

              <p>
                <span className="font-semibold">
                  Placa:
                </span>{" "}
                {guia.vehiculo?.placa}
              </p>

            </div>

          </div>

        </div>

        {/* VIAJE */}
        <div className="mt-3 border border-slate-300 rounded-lg p-3">

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 leading-6">

            <p>
              <span className="font-semibold">
                Punto Partida:
              </span>{" "}
              {guia.puntoPartida}
            </p>

            <p>
              <span className="font-semibold">
                Punto Llegada:
              </span>{" "}
              {guia.puntoLlegada}
            </p>

            <p>
              <span className="font-semibold">
                Motivo:
              </span>{" "}
              {guia.motivoTraslado}
            </p>

            <p>
              <span className="font-semibold">
                Comprobante:
              </span>{" "}
              {guia.comprobanteVenta || "-"}
            </p>

          </div>

        </div>

        {/* DETALLE */}
        <div className="mt-5 px-5">

          <h3
            className="
              text-[14px]
              font-bold
              mb-2
              uppercase
              text-center
            "
          >
            Detalle de Productos
          </h3>

          {/* CABECERA */}
          <div
            className="
              grid
              grid-cols-[90px_1fr]
              bg-slate-100
              border-t
              border-b
              border-slate-300
              py-2
              px-3
              font-bold
              uppercase
              text-[12px]
            "
          >

            <div>
              Unidades
            </div>

            <div>
              Detalle
            </div>

          </div>

          {/* ITEMS */}
          <div className="mt-1">

            {guia.items
              ?.slice(0, 5)
              .map((item: any, index: number) => (

                <div
                  key={index}
                  className="
                    grid
                    grid-cols-[90px_1fr]
                    py-[7px]
                    px-3
                    text-[12.5px]
                  "
                >

                  <div className="font-semibold">
                    {item.cantidad}
                  </div>

                  <div className="leading-6">

                    {item.producto?.nombre || ""}
                    {item.color?.nombre ? `, ${item.color.nombre}` : ""}
                    {item.gramaje?.nombre ? `, ${item.gramaje.nombre}` : ""}
                    {item.cuello?.nombre ? `, ${item.cuello.nombre}` : ""}

                  </div>

                </div>
              ))}

            {/* FILAS VACÍAS */}
            {Array.from({
              length: Math.max(
                0,
                5 - (guia.items?.length || 0)
              )
            }).map((_, i) => (

              <div
                key={`empty-${i}`}
                className="
                  grid
                  grid-cols-[90px_1fr]
                  py-[6px]
                  px-3
                "
              >

                <div></div>

                <div></div>

              </div>
            ))}

          </div>

        </div>

        {/* FIRMAS */}
        <div className="mt-24 flex justify-between px-10">

          <div className="w-[260px] text-center">

            <div className="border-t border-slate-500 pt-2">

              <p className="font-semibold text-[12px]">
                {guia.usuario_creador?.nombre}
              </p>

              <p className="text-[11px] text-slate-500">
                Firma Logística
              </p>

            </div>

          </div>

          <div className="w-[260px] text-center">

            <div className="border-t border-slate-500 pt-2">

              <p className="font-semibold text-[12px]">
                {guia.chofer?.nombre}
              </p>

              <p className="text-[11px] text-slate-500">
                Firma Transportista
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}