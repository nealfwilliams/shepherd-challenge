-- CreateTable
CREATE TABLE "FormData" (
    "id" SERIAL NOT NULL,
    "formTypeId" INTEGER NOT NULL,
    "values" JSONB NOT NULL,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormType" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "spec" JSONB NOT NULL,

    CONSTRAINT "FormType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormData" ADD CONSTRAINT "FormData_formTypeId_fkey" FOREIGN KEY ("formTypeId") REFERENCES "FormType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
