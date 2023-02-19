import { PrismaClient } from '@prisma/client';
import forms from '../forms';

const prisma = new PrismaClient()

async function main() {
  forms.forEach(async (form) => {
    const applicationType = await prisma.applicationType.findFirst({
      where: {
        label: form.name
      }
    });

    if (!applicationType) {
      await prisma.applicationType.create({
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