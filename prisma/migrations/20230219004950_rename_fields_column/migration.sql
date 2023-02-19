/*
  Warnings:

  - You are about to drop the column `values` on the `FormData` table. All the data in the column will be lost.
  - Added the required column `fields` to the `FormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormData" DROP COLUMN "values",
ADD COLUMN     "fields" JSONB NOT NULL;
