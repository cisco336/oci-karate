import { iArticle } from '@/components/shared/Card';

export interface iArticlesResponse {
    articleSchemas: iArticle[];
}

export interface iQuote {
    quoteSchema: {
        author: string[];
        content: string;
    };
}
