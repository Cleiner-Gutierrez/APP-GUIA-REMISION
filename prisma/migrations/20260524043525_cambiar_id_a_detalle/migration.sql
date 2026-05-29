/*
  Warnings:

  - The primary key for the `DetalleGuiaItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_item` on the `DetalleGuiaItem` table. All the data in the column will be lost.
  - Added the required column `id_producto` to the `DetalleGuiaItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleGuiaItem" DROP CONSTRAINT "DetalleGuiaItem_pkey",
DROP COLUMN "id_item",
ADD COLUMN     "id_detalle" SERIAL NOT NULL,
ADD COLUMN     "id_producto" INTEGER NOT NULL,
ALTER COLUMN "codigoInterno" DROP NOT NULL,
ADD CONSTRAINT "DetalleGuiaItem_pkey" PRIMARY KEY ("id_detalle");

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_gramaje" INTEGER NOT NULL,
    "id_color" INTEGER NOT NULL,
    "id_cuello" INTEGER NOT NULL,
    "id_usuario_creador" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_gramaje_fkey" FOREIGN KEY ("id_gramaje") REFERENCES "Gramaje"("id_gramaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_color_fkey" FOREIGN KEY ("id_color") REFERENCES "Color"("id_color") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_cuello_fkey" FOREIGN KEY ("id_cuello") REFERENCES "Cuello"("id_cuello") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_usuario_creador_fkey" FOREIGN KEY ("id_usuario_creador") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
