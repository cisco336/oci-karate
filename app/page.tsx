import {
    getData,
    quoteQueryBySlug,
    articlesByTagQuery,
} from '../services/hygraph.service';
import Card from '../components/shared/Card/Card';
import Quote from '@/components/Quote';
import { iQuote } from '../models/gqlModels';
import { iArticle } from '@/components/shared/Card';
import { Suspense } from 'react';
import { ImportantArticles } from '@/components/ImportantArticles/ImportantArticles';
import { ArticlesList } from '@/components/ArticlesList/ArticlesList';

export interface iArticlesResponse {
    articleSchemas: iArticle[];
}

export const mainquote: Promise<iQuote> = getData<iQuote>(quoteQueryBySlug, {
    slug: 'quote-manos-vacias',
});

export const articles: Promise<iArticlesResponse> = getData<iArticlesResponse>(
    articlesByTagQuery,
    {
        tag: ['main_page'],
    }
);

export default async function Index() {
    const [quote, contents] = await Promise.allSettled([mainquote, articles]);
    const mainQuote = quote.status === 'fulfilled' && (
        <div className="mx-auto hidden sm:flex px-4">
            <Quote {...quote.value} />
        </div>
    );

    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            {contents.status === 'fulfilled' &&
                quote.status === 'fulfilled' && (
                    <div className="w-full flex flex-col gap-20 items-center py-4">
                        <ImportantArticles
                            articles={contents.value.articleSchemas}
                        />
                        {mainQuote}
                        <ArticlesList
                            articles={contents.value.articleSchemas}
                        />
                    </div>
                )}
        </Suspense>
    );
}
