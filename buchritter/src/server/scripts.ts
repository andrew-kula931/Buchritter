import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let today = new Date().toLocaleDateString();

  await prisma.documents.deleteMany();
  const doc = await prisma.documents.create({
    data: {
      name: "First Doc",
      created_at: today,
      body: "Starter Text",
    },
  });

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
