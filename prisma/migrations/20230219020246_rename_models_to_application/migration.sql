/*
  Warnings:

  - You are about to drop the `FormData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormData" DROP CONSTRAINT "FormData_formTypeId_fkey";

-- DropTable
DROP TABLE "FormData";

-- DropTable
DROP TABLE "FormType";

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "fields" JSONB NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationType" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "spec" JSONB NOT NULL,

    CONSTRAINT "ApplicationType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ApplicationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
