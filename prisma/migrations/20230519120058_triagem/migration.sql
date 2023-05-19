-- CreateTable
CREATE TABLE "Triagem" (
    "id" SERIAL NOT NULL,
    "distribuidora" TEXT NOT NULL,
    "concessionaria" TEXT NOT NULL,

    CONSTRAINT "Triagem_pkey" PRIMARY KEY ("id")
);
