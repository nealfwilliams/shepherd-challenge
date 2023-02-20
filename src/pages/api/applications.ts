import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/constants';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  id?: number,
  error?: string
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.cookies[AUTH_COOKIE_NAME] !== AUTH_COOKIE_VALUE) {
    res.status(403).json({
      error: 'not authorized'
    });
  }

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
    res.status(400).json({
      error: 'Unexpected error'
    });
  }
}
