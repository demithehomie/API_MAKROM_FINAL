/*
  Warnings:

  - You are about to drop the column `concessionaria` on the `TriagemProdist` table. All the data in the column will be lost.
  - You are about to drop the column `distribuidora` on the `TriagemProdist` table. All the data in the column will be lost.
  - Added the required column `operadora_concessionaria` to the `TriagemProdist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TriagemProdist" DROP COLUMN "concessionaria",
DROP COLUMN "distribuidora",
ADD COLUMN     "operadora_concessionaria" TEXT NOT NULL;
