/*
  Warnings:

  - You are about to drop the `DanData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KyuData` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."kyuDan" AS ENUM ('NOVENO', 'OCTAVO', 'SEPTIMO', 'SEXTO', 'QUINTO', 'CUARTO', 'TERCER', 'SEGUNDO', 'PRIMERO');

-- AlterTable
ALTER TABLE "public"."UserData" ADD COLUMN     "belt" "public"."BeltColors",
ADD COLUMN     "dan" "public"."kyuDan",
ADD COLUMN     "kyu" "public"."kyuDan";

-- DropTable
DROP TABLE "public"."DanData";

-- DropTable
DROP TABLE "public"."KyuData";
