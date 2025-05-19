"use server";

import { PrismaClient } from "@/server/prisma";

const prisma = new PrismaClient();

export type Review = {
  title: string;
  summary: string;
  rating: number;
  review: string;
  image_path?: string;
  link?: string;
  tags: number[];
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
        connect: tags.map((id)=> ({ id })),
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