import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  id?: number,
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Unexpected HTTP method');
    }

    const formTypeId = req.body.formTypeId as number;

    const formData = await prisma.formData.create({
      data: {
        formTypeId,
        fields: {}
      }
    });

    res.status(200).json({ id: formData.id })

  } catch (e) {
    res.status(400);
  }
}
