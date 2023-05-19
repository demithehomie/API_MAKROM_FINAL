/*
  Warnings:

  - You are about to drop the column `TipoDeRamai` on the `Prodist` table. All the data in the column will be lost.
  - Added the required column `TipoDeRamal` to the `Prodist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prodist" DROP COLUMN "TipoDeRamai",
ADD COLUMN     "TipoDeRamal" TEXT NOT NULL;
