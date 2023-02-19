import { Prisma } from "@prisma/client";

export type Application = Prisma.ApplicationGetPayload<{
  include: {
    type: true
  }
}>;

export type ApplicationType = Prisma.ApplicationTypeGetPayload<{}>