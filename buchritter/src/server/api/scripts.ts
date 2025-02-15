import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main() {
  const doc = await prisma.documents.findFirst({});
  console.log(doc);
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

/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const documents = await prisma.documents.findMany();
    res.status(200).json(documents);
  } else if (req.method === "POST") {
    const { name, body } = req.body;
    const newDocument = await prisma.documents.create({
      data: { name, body, created_at: new Date().toISOString() },
    });
    res.status(201).json(newDocument);
  } else {
    res.status(405).json({ message: "method Not Allowed" });
  }
}

*/
