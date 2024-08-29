import { z } from 'zod';

export const ArticleType = z.object({
    id: z.string(),
    articleTitle: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    slug: z.string(),
    abstract: z.string().optional(),
    tag: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    asset: z
        .object({
            url: z.string(),
        })
        .optional(),
    image: z
        .object({
            url: z.string(),
        })
        .optional(),
    articleContent: z.object({
        html: z.string(),
        json: z.unknown(),
    }),
});

export type ArticleType = z.infer<typeof ArticleType>;
