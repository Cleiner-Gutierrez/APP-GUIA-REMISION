/*
  Warnings:

  - You are about to drop the column `id_color` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `id_cuello` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `id_gramaje` on the `Producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_color_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_cuello_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_gramaje_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "id_color",
DROP COLUMN "id_cuello",
DROP COLUMN "id_gramaje",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "DetalleGuiaItem" ADD CONSTRAINT "DetalleGuiaItem_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
