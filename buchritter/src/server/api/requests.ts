"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDoc(id: number) {
  const doc = await prisma.documents.findFirst({
    where: {
      id: id,
    },
  });

  return doc;
}

// bodyText: Prisma.InputJsonValue | typeof Prisma.JsonNull
// This notation was not an issue originally but with a prisma update, it
// doesn't work anymore, take a look at this later
export async function updateDocument(id: number, bodyText: any) {
  await prisma.documents.update({
    where: {
      id: id,
    },
    data: {
      updated_at: new Date().toString(),
      body: bodyText,
    },
  });
}

export async function updateName(id: number, nameText: string) {
  await prisma.documents.update({
    where: {
      id: id,
    },
    data: {
      updated_at: new Date().toString(),
      name: nameText,
    },
  });
}

export async function getDocuments() {
  const docs = await prisma.documents.findMany();
  return docs;
}

export async function addDocument(type: "file" | "folder", parent?: number) {
  await prisma.documents.create({
    data: {
      name: "Untitled",
      created_at: new Date().toString(),
      userId: 1,
      parentId: parent,
      type: type,
    },
  });
}

export async function deleteDocument(id: number) {
  await prisma.documents.delete({
    where: {
      id: id,
    },
  });
}

export async function deleteFolder(id: number) {
  const newParentId = await prisma.documents.findFirst({
    where: {
      id: id,
    },
    select: {
      parentId: true,
    },
  });

  await prisma.documents.updateMany({
    where: {
      parentId: id,
    },
    data: {
      parentId: newParentId?.parentId,
    },
  });

  await prisma.documents.delete({
    where: {
      id: id,
    },
  });
}

export async function moveItem(itemId: number, parentId: number) {
  await prisma.documents.update({
    where: {
      id: itemId,
    },
    data: {
      parentId: parentId,
    },
  });
}

export async function moveToRoot(itemId: number) {
  await prisma.documents.update({
    where: {
      id: itemId,
    },
    data: {
      parentId: null,
    },
  });
}
