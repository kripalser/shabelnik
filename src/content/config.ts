import { defineCollection, z } from 'astro:content';

const year = z.custom<number>((val) => {
    return /(?:19|20)[0-9]{2}/.test(val as string);
}, 'Input should be a year');

// Type-check frontmatter using a schema
export const collections = {
    books: defineCollection({
        schema: z.object({
            title: z.string(),
            author: z.string().optional(),
            publisher: z.string(),
            year: year,
            edition: z.number().optional(),
            isbn: z.string().optional(),
            format: z.string(),
            status: z.array(z.string()).optional(),
        }),
    }),
};
