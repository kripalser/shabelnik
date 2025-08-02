import { defineCollection, z } from "astro:content";
import { formats } from "@data/formats";
import { statuses } from "@data/statuses.ts";
import type { Status } from "@types";
import { glob } from "astro/loaders";

const yearSchema = z.custom<number>((val) => {
  return /(?:19|20)[0-9]{2}/.test(val as string);
}, "Input should be a year");
const formatSchema = z.enum(Object.keys(formats) as [string, ...string[]]);
const statusSchema = z.array(
  z.enum(Object.keys(statuses) as [Status, ...Status[]]),
);

const aids = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/aids" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string(),
    year: yearSchema,
    isbn: z.string().optional(),
    format: formatSchema,
    status: statusSchema.optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string(),
    year: yearSchema,
    edition: z.number().optional(),
    isbn: z.string().optional(),
    format: formatSchema,
    status: statusSchema.optional(),
  }),
});

const filmstrips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/filmstrips" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string(),
    year: yearSchema,
    isbn: z.string().optional(),
    format: formatSchema.optional(),
    status: statusSchema.optional(),
  }),
});

const magazines = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/magazines" }),
  schema: z.object({
    title: z.string(),
    publisher: z.string(),
    year: yearSchema,
    issue: z.number(),
    issn: z.string().optional(),
    format: formatSchema,
    status: statusSchema.optional(),
  }),
});

export const collections = { aids, books, filmstrips, magazines };
