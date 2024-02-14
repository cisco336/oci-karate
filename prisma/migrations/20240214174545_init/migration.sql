-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SENSEI', 'PARENT', 'STUDENT');

-- CreateEnum
CREATE TYPE "public"."BeltColors" AS ENUM ('BLANCO', 'AMARILLO', 'NARANJA', 'AZUL', 'VERDE', 'VIOLETA', 'MARRON', 'NEGRO');

-- CreateTable
CREATE TABLE "public"."UserData" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "degree" TEXT[],
    "children" TEXT[],
    "medicalData" TEXT[],
    "agreedTerms" BOOLEAN NOT NULL,
    "setPasswd" BOOLEAN NOT NULL,
    "isChild" BOOLEAN NOT NULL,
    "parents" TEXT[],
    "kyuDataId" INTEGER,
    "danDataId" INTEGER,

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

-- CreateTable
CREATE TABLE "public"."KyuData" (
    "id" SERIAL NOT NULL,
    "belt" "public"."BeltColors" NOT NULL,

    CONSTRAINT "KyuData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DanData" (
    "id" SERIAL NOT NULL,
    "belt" "public"."BeltColors" NOT NULL,

    CONSTRAINT "DanData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "public"."UserData"("userId");

-- CreateIndex
CREATE INDEX "UserData_danDataId_idx" ON "public"."UserData"("danDataId");

-- CreateIndex
CREATE INDEX "UserData_kyuDataId_idx" ON "public"."UserData"("kyuDataId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalData_userId_key" ON "public"."MedicalData"("userId");
