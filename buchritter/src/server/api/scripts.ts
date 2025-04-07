import { PrismaClient } from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main() {
  const doc = await prisma.documents.findFirst({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
