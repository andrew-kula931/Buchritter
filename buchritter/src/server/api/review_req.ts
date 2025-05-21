"use server";

import { PrismaClient } from "@/server/prisma";

const prisma = new PrismaClient();

export type Review = {
  id: number;
  title: string;
  summary: string;
  rating: number;
  image_path?: string;
  review: string;
  link?: string;
  created_at: Date;
  tags: Configurations[];
};

export type Configurations = {
  id: number;
  name: string;
  key: string;
  value: string;
}

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

export async function addReview(input: Review){
  const { title, summary, rating, review, image_path, link, tags } = input;

  return await prisma.reviews.create({
    data: {
      title: title,
      summary: summary ?? '',
      rating: rating,
      review: review,
      image_path: image_path,
      link: link,
      tags: {
        connect: tags.map((t) => ({ id: t.id })),
      },
    },
    include: { tags: true },
  });
}

export async function getTags() {
  return await prisma.configurations.findMany({
    where: {
      name: 'review.tag'
    }
  })
}