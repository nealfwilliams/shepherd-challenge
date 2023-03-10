import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, SUCCESS_RESPONSE } from '@/constants';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  error?: string;
  application?: Object;
} | typeof SUCCESS_RESPONSE

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.cookies[AUTH_COOKIE_NAME] !== AUTH_COOKIE_VALUE) {
    res.status(403).json({
      error: 'Not authorized'
    });
  }

  if (req.method === 'GET') {
    const { applicationId } = req.query;

    const application = await prisma.application.findFirst({
      where: {
        id: Number(applicationId)
      },
      include: {
        type: true
      }
    });

    if (!application) {
      res.status(404).json({
        error: 'Can not find application'
      });
    } else {
      res.status(200).json({ application })
    }

  } else if (req.method === 'PATCH') {
    const { applicationId } = req.query;
    const {fields} = req.body;

    // TO-DO validate fields against form spec;
    try {
      await prisma.application.update({
        data: {
          fields
        },
        where: {
          id: Number(applicationId)
        },
      });

      res.status(200).send(SUCCESS_RESPONSE);

    } catch {
      res.status(400).send({
        error: 'Error updating form data'
      })
    }
  }

  res.status(400).send({
    error: 'Invalid request method'
  });
}
