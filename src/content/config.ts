import { defineCollection, z } from 'astro:content';

// Type-check frontmatter using a schema
export const collections = {
    books: defineCollection({
        schema: z.object({
            title: z.string(),
            author: z.string().optional(),
            publisher: z.string(),
            year: z.number(), // Todo: validate year
            isbn: z.string().optional(),
            format: z.string(),
            status: z.array(z.string()).optional(),
        }),
    }),
    // work: defineCollection({
    //     schema: z.object({
    //         title: z.string(),
    //         date: z.date(),
    //         tags: z.array(z.string()),
    //     }),
    // }),
};
