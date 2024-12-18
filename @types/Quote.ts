import { z } from 'zod';

export const zQuote = z.object({
  quoteSchema: z.object({
    author: z.array(z.string()),
    content: z.string(),
  }),
});

export type QuoteType = z.infer<typeof zQuote>;
