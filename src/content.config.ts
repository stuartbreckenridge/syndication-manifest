import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entries = defineCollection({
  loader: glob({
    base: "./src/content/entries",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.object({
    title: z.string(),
    guid: z.string().regex(/^[A-Za-z0-9_-]{21}$/),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false)
  })
});

export const collections = { entries };
