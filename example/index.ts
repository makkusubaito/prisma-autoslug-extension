import { PrismaClient } from "@prisma/client";
import { createWithSlugFn } from "../dist";

const prisma = new PrismaClient().$extends(createWithSlugFn())

async function main() {

  const post = await prisma.post.createWithSlug({data: 
    {
      title: "Hello World!",
      updatedAt: new Date(),
    },
     field: "title",
    unique: true} 
   )

  console.log({ post })
}

main()
