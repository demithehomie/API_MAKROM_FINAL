-- CreateTable
CREATE TABLE "PRODIST" (
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
CREATE UNIQUE INDEX "PRODIST_NumeroDoCliente_key" ON "PRODIST"("NumeroDoCliente");
