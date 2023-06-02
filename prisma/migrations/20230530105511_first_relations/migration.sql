-- AlterTable
ALTER TABLE "Prodist" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "idCooperado" INTEGER NOT NULL DEFAULT 500,
ADD CONSTRAINT "Prodist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isCooperadoApoiador" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "additionalEmails" SET DATA TYPE VARCHAR(250);

-- AddForeignKey
ALTER TABLE "Prodist" ADD CONSTRAINT "Prodist_idCooperado_fkey" FOREIGN KEY ("idCooperado") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
