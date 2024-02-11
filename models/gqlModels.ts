export interface iArticlesResponse {
    articleSchemas: iArticle[];
}

export interface iArticle {
    id: string;
    articleTitle: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    abstract?: string;
    tag?: string[];
    asset?: {
        url: string;
    };
    image?: {
        url: string;
    };
    articleContent: {
        html: string;
    };
}

export interface iQuote {
    quoteSchema: {
        author: string[];
        content: string;
    };
}
