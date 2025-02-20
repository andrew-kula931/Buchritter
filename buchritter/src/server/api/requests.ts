"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDoc() {
  const doc = await prisma.documents.findFirst({});

  return doc;
}

export async function updateDocument(
  id: number,
  bodyText: Prisma.InputJsonValue | typeof Prisma.JsonNull
) {
  const doc = await prisma.documents.update({
    where: {
      id: 1,
    },
    data: {
      body: bodyText,
    },
  });
}
