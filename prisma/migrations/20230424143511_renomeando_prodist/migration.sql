/*
  Warnings:

  - You are about to drop the `PRODIST` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PRODIST";

-- CreateTable
CREATE TABLE "Prodist" (
    "ContaDeLuz" TEXT NOT NULL,
    "NumeroDoCliente" TEXT NOT NULL,
    "ClasseUC" TEXT NOT NULL,
    "CotaMensal" TEXT NOT NULL,
    "PotenciaInstalada" TEXT NOT NULL,
    "TensaoDeAtendimento" INTEGER NOT NULL,
    "TipoDeConexao" TEXT NOT NULL,
    "TipoDeRamai" TEXT NOT NULL,
    "PotenciaInstaladaGeral" TEXT NOT NULL,
    "TipoDaFonteDeGeracao" TEXT NOT NULL,
    "MenorConsumoUltimos12" TEXT NOT NULL,
    "MaiorConsumoUltimos12" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Prodist_NumeroDoCliente_key" ON "Prodist"("NumeroDoCliente");
