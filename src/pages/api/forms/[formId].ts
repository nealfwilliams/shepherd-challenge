import { SUCCESS_RESPONSE } from '@/constants';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  error?: string;
  formData?: Object;
} | typeof SUCCESS_RESPONSE

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    const { formId } = req.query;

    const formData = await prisma.formData.findFirst({
      where: {
        id: Number(formId)
      },
      include: {
        formType: true
      }
    });

    if (!formData) {
      res.status(404);
    } else {
      res.status(200).json({ formData })
    }

  } else if (req.method === 'PATCH') {
    const { formId } = req.query;
    const {fields} = req.body;

    // TO-DO validate fields against form spec;
    try {
      await prisma.formData.update({
        data: {
          fields
        },
        where: {
          id: Number(formId)
        },
      });
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
