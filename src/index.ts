import { Prisma } from '@prisma/client/extension'
import slugify from 'slugify'

type Args = {
  field: string,
  unique?: boolean,
}


export const createWithSlugFn = () =>
  Prisma.defineExtension({
    name: "prisma-create-with-slug",
    model: {
      $allModels: {
        async createWithSlug<T,A>(
          this: T,
          args: Omit<Prisma.Args<T, 'create'> & Args, 'data'>  & {data: Omit<Prisma.Args<T, 'create'>['data'], 'slug'>}
        ): Promise<Prisma.Result<T,A, 'create'>> {
          const ctx = Prisma.getExtensionContext(this)
          let slug = slugify((args.data as any)[args.field],{
            lower: true,
            strict: true,
          })
          if (args.unique) {
            let number = 0 
            let count = await (ctx as any).count({
              where: {
                slug,
              },
            })
            while (count > 0) {
              number += 1
              count = await (ctx as any).count({
                where: {
                  slug: `${slug}-${number}`,
                },
              })
            }
            if (number > 0) {
              slug = `${slug}-${number}`
            }
            
          }
          const result = await (ctx as any).create({
            data: {
              ...args.data,
              slug,
            }})
          return result
        },
      },
    },
  })
