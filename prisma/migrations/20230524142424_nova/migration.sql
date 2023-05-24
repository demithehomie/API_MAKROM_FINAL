-- CreateTable
CREATE TABLE "Triagem" (
    "id" SERIAL NOT NULL,
    "distribuidora" TEXT NOT NULL,
    "concessionaria" TEXT NOT NULL,

    CONSTRAINT "Triagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prodist" (
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
    "MaiorConsumoUltimos12" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(63) NOT NULL DEFAULT 'name',
    "cpfCnpj" VARCHAR(127) NOT NULL DEFAULT 'cpfCnpj'
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "cpfCnpj" VARCHAR(127) NOT NULL,
    "mobilePhone" VARCHAR(12) NOT NULL DEFAULT 'mobilePhone',
    "phone" VARCHAR(12) NOT NULL,
    "company" VARCHAR(50) NOT NULL,
    "postalCode" VARCHAR(9) NOT NULL DEFAULT 'postalCode',
    "address" VARCHAR(250) NOT NULL,
    "state" VARCHAR(250) NOT NULL,
    "province" VARCHAR(250) NOT NULL DEFAULT 'province',
    "city" VARCHAR(50) NOT NULL,
    "addressNumber" VARCHAR(5) NOT NULL,
    "complement" VARCHAR(250) NOT NULL DEFAULT 'complement',
    "municipalInscription" VARCHAR(50) NOT NULL DEFAULT 'municipalinscription',
    "stateInscription" VARCHAR(50) NOT NULL DEFAULT 'stateinscription',
    "additionalEmails" VARCHAR(50) NOT NULL DEFAULT 'additionalEmails',
    "observations" VARCHAR(250) NOT NULL DEFAULT 'observations',
    "birthAt" TIMESTAMP(0),
    "role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSMSVerified" TEXT NOT NULL DEFAULT 'false',
    "emailVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',
    "SMSVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',
    "forgetVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prodist_NumeroDoCliente_key" ON "Prodist"("NumeroDoCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_key" ON "Cliente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfCnpj_key" ON "Cliente"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
