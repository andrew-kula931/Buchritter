"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDoc() {
  const doc = await prisma.documents.findFirst({});

  return doc;
}
