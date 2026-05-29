-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'VENTAS', 'BODEGA', 'GERENCIA', 'OPERADOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'OPERADOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Plastecniva" (
    "id_emisor" SERIAL NOT NULL,
    "ruc" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL DEFAULT 'PLASTECNIVA S.A.',
    "nombreComercial" TEXT,
    "direccionMatriz" TEXT NOT NULL,
    "direccionEstablecimiento" TEXT,
    "establecimiento" TEXT NOT NULL DEFAULT '001',
    "puntoEmision" TEXT NOT NULL DEFAULT '001',
    "ambiente" TEXT NOT NULL DEFAULT 'PRUEBA',
    "tipoEmision" TEXT NOT NULL DEFAULT 'NORMAL',
    "obligadoContabilidad" TEXT NOT NULL DEFAULT 'SI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Plastecniva_pkey" PRIMARY KEY ("id_emisor")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "identificacion" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "direccionDescarga" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "EmpresaTransporte" (
    "id_empresa" SERIAL NOT NULL,
    "ruc" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "telefono" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "EmpresaTransporte_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "Chofer" (
    "id_chofer" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "licencia" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Chofer_pkey" PRIMARY KEY ("id_chofer")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id_vehiculo" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id_vehiculo")
);

-- CreateTable
CREATE TABLE "Gramaje" (
    "id_gramaje" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Gramaje_pkey" PRIMARY KEY ("id_gramaje")
);

-- CreateTable
CREATE TABLE "Color" (
    "id_color" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id_color")
);

-- CreateTable
CREATE TABLE "Cuello" (
    "id_cuello" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Cuello_pkey" PRIMARY KEY ("id_cuello")
);

-- CreateTable
CREATE TABLE "GuiaRemision" (
    "id_guia" SERIAL NOT NULL,
    "secuencial" TEXT NOT NULL,
    "claveAcceso" TEXT,
    "numeroAutorizacion" TEXT,
    "fechaAutorizacion" TIMESTAMP(3),
    "estadoSri" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaInicioTrans" TIMESTAMP(3) NOT NULL,
    "fechaFinTrans" TIMESTAMP(3),
    "puntoPartida" TEXT NOT NULL DEFAULT 'PLANTA PLASTECNIVA',
    "puntoLlegada" TEXT NOT NULL,
    "motivoTraslado" TEXT NOT NULL DEFAULT 'VENTA',
    "comprobanteVenta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,
    "id_emisor" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_empresa_trans" INTEGER NOT NULL,
    "id_chofer" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,

    CONSTRAINT "GuiaRemision_pkey" PRIMARY KEY ("id_guia")
);

-- CreateTable
CREATE TABLE "DetalleGuiaItem" (
    "id_item" SERIAL NOT NULL,
    "codigoInterno" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_gramaje" INTEGER NOT NULL,
    "id_color" INTEGER NOT NULL,
    "id_cuello" INTEGER NOT NULL,
    "id_guia" INTEGER NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "DetalleGuiaItem_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "ParametroSistema" (
    "id_parametro" SERIAL NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "ParametroSistema_pkey" PRIMARY KEY ("id_parametro")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plastecniva_ruc_key" ON "Plastecniva"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_identificacion_key" ON "Cliente"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "EmpresaTransporte_ruc_key" ON "EmpresaTransporte"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Chofer_cedula_key" ON "Chofer"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Gramaje_nombre_key" ON "Gramaje"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Color_nombre_key" ON "Color"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Cuello_nombre_key" ON "Cuello"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "GuiaRemision_secuencial_key" ON "GuiaRemision"("secuencial");

-- CreateIndex
CREATE UNIQUE INDEX "GuiaRemision_claveAcceso_key" ON "GuiaRemision"("claveAcceso");

-- CreateIndex
CREATE UNIQUE INDEX "GuiaRemision_numeroAutorizacion_key" ON "GuiaRemision"("numeroAutorizacion");

-- CreateIndex
CREATE UNIQUE INDEX "ParametroSistema_clave_key" ON "ParametroSistema"("clave");

-- AddForeignKey
ALTER TABLE "Plastecniva" ADD CONSTRAINT "Plastecniva_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaTransporte" ADD CONSTRAINT "EmpresaTransporte_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chofer" ADD CONSTRAINT "Chofer_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gramaje" ADD CONSTRAINT "Gramaje_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuello" ADD CONSTRAINT "Cuello_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_emisor_fkey" FOREIGN KEY ("id_emisor") REFERENCES "Plastecniva"("id_emisor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_empresa_trans_fkey" FOREIGN KEY ("id_empresa_trans") REFERENCES "EmpresaTransporte"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "Chofer"("id_chofer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaRemision" ADD CONSTRAINT "GuiaRemision_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id_vehiculo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_gramaje_fkey" FOREIGN KEY ("id_gramaje") REFERENCES "Gramaje"("id_gramaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_color_fkey" FOREIGN KEY ("id_color") REFERENCES "Color"("id_color") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_cuello_fkey" FOREIGN KEY ("id_cuello") REFERENCES "Cuello"("id_cuello") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_guia_fkey" FOREIGN KEY ("id_guia") REFERENCES "GuiaRemision"("id_guia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametroSistema" ADD CONSTRAINT "ParametroSistema_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
