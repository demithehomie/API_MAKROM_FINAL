/*
  Warnings:

  - Added the required column `ehTitular` to the `TriagemProdist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TriagemProdist" ADD COLUMN     "ehTitular" BOOLEAN NOT NULL;
