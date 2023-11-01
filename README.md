# prisma-extension-create-with-slug
## Description

Prisma Client Extension to automatically generate a unique slug creating a new Database entry. 

Provides a new function that generates a slug depending on a selected field. If needed the field can be unique.

## Install
```
npm install prisma-extension-create-with-slug
```

## Usage 

```
import {createWithSlugFn} from prisma-extension-create-with-slug

const prisma = new PrismaClient().$extends(createWithSlugFn())


  const post = await prisma.post.createWithSlug({data: 
    {
      title: "Hello World!",
      updatedAt: new Date(),
    },
     sourceField: "title",
     targetField: "slug",
    unique: true} 
   )


```

## Options 

```
await prisma.YOUR_MODEL.createWithSlug({
    data: {
        ...
    },
    sourceField: 'FIELDNAME' or ['FIELDNAME1', 'FIELDNAME2'] // name of the field(s) you want the slug to be based on
    targetField: 'FIELDNAME' // name of the field the slug should be written to
    unique: true       // whether or not the slug should be unique (increments an integer after the slug)
})

```

## Dependencies

[slugify] (https://github.com/simov/slugify)
create with the [prisma extension starter](https://github.com/prisma/prisma-client-extension-starter)


 

