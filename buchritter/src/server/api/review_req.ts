"use server";

import { Prisma, PrismaClient } from "@/server/prisma";

const prisma = new PrismaClient();

export async function getReview(id: number) {
  return await prisma.reviews.findFirst({
    where: {
      id: id,
    },
    include: {
      tags: true,
    },
  });
}

export async function getReviews() {
  return await prisma.reviews.findMany({
    include: {
      tags: true,
    },
  });
}
