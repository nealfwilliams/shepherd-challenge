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

    const typeId = req.body.typeId as number;

    const application = await prisma.application.create({
      data: {
        typeId,
        fields: {}
      }
    });

    res.status(200).json({ id: application.id })

  } catch (e) {
    res.status(400);
  }
}
