-- Fix access to shadow db
-- REVOKE CONNECT ON DATABASE 'prisma_migrate_shadow_db_c3b63a18-6500-44b6-ba6d-bca7daffefc0' FROM public;
-- SELECT pg_terminate_backend(pg_stat_activity.pid)
-- FROM pg_stat_activity
-- WHERE pg_stat_activity.datname = 'prisma_migrate_shadow_db_c3b63a18-6500-44b6-ba6d-bca7daffefc0';
-- COMMIT;

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SENSEI', 'PARENT', 'STUDENT', 'PARENT_AND_STUDENT');

-- CreateEnum
CREATE TYPE "public"."BeltColors" AS ENUM ('BLANCO', 'AMARILLO', 'NARANJA', 'AZUL', 'VERDE', 'VIOLETA', 'MARRON', 'NEGRO');

-- CreateEnum
CREATE TYPE "public"."kyuDan" AS ENUM ('NOVENO', 'OCTAVO', 'SEPTIMO', 'SEXTO', 'QUINTO', 'CUARTO', 'TERCER', 'SEGUNDO', 'PRIMERO', 'NA');

-- CreateTable
CREATE TABLE "public"."UserData" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "belt" "public"."BeltColors",
    "degree" TEXT[],
    "children" TEXT[],
    "medicalData" TEXT[],
    "agreedTerms" BOOLEAN NOT NULL,
    "setPasswd" BOOLEAN NOT NULL,
    "isChild" BOOLEAN NOT NULL,
    "parents" TEXT[],
    "kyu" "public"."kyuDan" NOT NULL DEFAULT 'NOVENO',
    "dan" "public"."kyuDan" NOT NULL DEFAULT 'NA',
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicalData" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "blodType" TEXT NOT NULL,
    "eps" TEXT NOT NULL,
    "prepaidMedicine" TEXT NOT NULL,
    "specialCondition" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,

    CONSTRAINT "MedicalData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "public"."UserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalData_userId_key" ON "public"."MedicalData"("userId");
