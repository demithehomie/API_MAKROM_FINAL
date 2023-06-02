-- AlterTable
CREATE SEQUENCE prodist_idcooperado_seq;
ALTER TABLE "Prodist" ALTER COLUMN "idCooperado" SET DEFAULT nextval('prodist_idcooperado_seq');
ALTER SEQUENCE prodist_idcooperado_seq OWNED BY "Prodist"."idCooperado";
