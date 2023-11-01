import { PrismaClient } from "@prisma/client";
import { createWithSlugFn } from "../dist";

const prisma = new PrismaClient().$extends(createWithSlugFn());

async function main() {
  const post = await prisma.post.createWithSlug({
    data: {
      title: "Hello World!",
      name: "test",
      updatedAt: new Date(),
    },
    sourceField: "title",
    targetField: "slug",
    unique: true,
  });

  console.log({ post });
}

main();
