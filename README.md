# Prisma Client to automatically generate a unique slug creating a new Database entry. 

Provides a new function that generates a slug depending on a selected field. If needed the field can be unique.


## Usage 
`
import {createWithSlugFn} from @baito/prisma-client-extension-create-slugify

const prisma = new PrismaClient().$extends(createWithSlugFn())


  const post = await prisma.post.createWithSlug({data: 
    {
      title: "Hello World!",
      updatedAt: new Date(),
    },
     field: "title",
    unique: true} 
   )


`

## Options 

`
await prisma.YOUR_MODEL.createWithSlug({
    data: {
        ...
    },
    field: 'FIELDNAME' // name of the field you want the slug to be based on
    unique: true       // whether or not the slug should be unique (increments an integer after the slug)
})

`

## Dependencies

[slugify] (https://github.com/simov/slugify)
create with the [prisma extension starter](https://github.com/prisma/prisma-client-extension-starter)


 

