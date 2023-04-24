/*
  Warnings:

  - Changed the type of `NumeroDoCliente` on the `Prodist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prodist" DROP COLUMN "NumeroDoCliente",
ADD COLUMN     "NumeroDoCliente" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Prodist_NumeroDoCliente_key" ON "Prodist"("NumeroDoCliente");
