"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Only finds a single document with no filters
// Delete or alter
export async function getDoc(id: number) {
  const doc = await prisma.documents.findFirst({
    where: {
      id: id,
    },
  });

  return doc;
}

export async function updateDocument(
  id: number,
  bodyText: Prisma.InputJsonValue | typeof Prisma.JsonNull
) {
  const doc = await prisma.documents.update({
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
  const doc = await prisma.documents.update({
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
  const newDoc = await prisma.documents.create({
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
  const deleteDoc = await prisma.documents.delete({
    where: {
      id: id,
    },
  });
}
