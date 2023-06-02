/*
  Warnings:

  - You are about to drop the `Prodist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Triagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prodist" DROP CONSTRAINT "Prodist_idCooperado_fkey";

-- DropTable
DROP TABLE "Prodist";

-- DropTable
DROP TABLE "Triagem";

-- CreateTable
CREATE TABLE "TriagemProdist" (
    "id" SERIAL NOT NULL,
    "idCooperado" SERIAL NOT NULL,
    "ContaDeLuz" TEXT NOT NULL,
    "NumeroDoCliente" TEXT NOT NULL,
    "ClasseUC" TEXT NOT NULL,
    "CotaMensal" TEXT NOT NULL,
    "PotenciaInstalada" TEXT NOT NULL,
    "TensaoDeAtendimento" TEXT NOT NULL,
    "TipoDeConexao" TEXT NOT NULL,
    "TipoDeRamal" TEXT NOT NULL,
    "PotenciaInstaladaGeral" TEXT NOT NULL,
    "TipoDaFonteDeGeracao" TEXT NOT NULL,
    "MenorConsumoUltimos12" TEXT NOT NULL,
    "MaiorConsumoUltimos12" TEXT NOT NULL,
    "distribuidora" TEXT NOT NULL,
    "concessionaria" TEXT NOT NULL,
    "ehCooperadoApoiador" BOOLEAN NOT NULL,

    CONSTRAINT "TriagemProdist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TriagemProdist_NumeroDoCliente_key" ON "TriagemProdist"("NumeroDoCliente");

-- AddForeignKey
ALTER TABLE "TriagemProdist" ADD CONSTRAINT "TriagemProdist_idCooperado_fkey" FOREIGN KEY ("idCooperado") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
