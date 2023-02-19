import { PrismaClient } from '@prisma/client';
import forms from '../forms';

const prisma = new PrismaClient()

async function main() {
  forms.forEach(async (form) => {
    const formType = await prisma.formType.findFirst({
      where: {
        label: form.name
      }
    });

    if (!formType) {
      await prisma.formType.create({
        data: {
          label: form.name,
          spec: form.fields
        }
      });
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })