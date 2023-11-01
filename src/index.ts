import { Prisma } from "@prisma/client/extension";
import slugify from "slugify";

type Args = {
  sourceField: string[] | string;
  targetField?: string;
  unique?: boolean;
};

// omit generic type F from data

export const createWithSlugFn = () =>
  Prisma.defineExtension({
    name: "prisma-extension-create-with-slug",
    model: {
      $allModels: {
        async createWithSlug<T, A>(
          this: T,
          args: Omit<Prisma.Args<T, "create"> & Args, "data"> & {
            data: Partial<Prisma.Args<T, "create">["data"]>;
          },
        ): Promise<Prisma.Result<T, A, "create">> {
          if (Array.isArray(args.sourceField)) {
            args.sourceField.forEach((field: string) => {
              if (args.data[field] === undefined) {
                const errorMessage =
                  "Cannot create slug, sourceField " +
                  field +
                  " is missing in create data";
                throw new Error(errorMessage);
              }
            });
          } else if (args.data[args.sourceField] === undefined) {
            const errorMessage =
              "Cannot create slug, sourceField " +
              args.sourceField +
              " is missing in create data";
            throw new Error(errorMessage);
          }
          const source = Array.isArray(args.sourceField)
            ? args.sourceField
                .map((field: string) => (args.data as any)[field])
                .join("-")
            : (args.data as any)[args.sourceField];
          const targetField = args.targetField ? args.targetField : "slug";
          const unique = args.unique === true ? true : false;
          const ctx = Prisma.getExtensionContext(this);
          let slug = slugify(source, {
            lower: true,
            strict: true,
          });
          if (unique) {
            let number = 0;
            let count = await (ctx as any).count({
              where: {
                [targetField]: slug,
              },
            });
            while (count > 0) {
              number += 1;
              count = await (ctx as any).count({
                where: {
                  slug: `${slug}-${number}`,
                },
              });
            }
            if (number > 0) {
              slug = `${slug}-${number}`;
            }
          }
          const result = await (ctx as any).create({
            data: {
              ...args.data,
              [targetField]: slug,
            },
          });
          return result;
        },
      },
    },
  });
