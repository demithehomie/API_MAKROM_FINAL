-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "cpfCnpj" VARCHAR(127) NOT NULL DEFAULT 'cpfCnpj',
ADD COLUMN     "name" VARCHAR(63) NOT NULL DEFAULT 'name';
